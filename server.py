from http.server import HTTPServer as BaseHTTPServer, SimpleHTTPRequestHandler
import os


class HTTPHandler(SimpleHTTPRequestHandler):
    """This handler uses server.base_path instead of always using os.getcwd()"""

    def translate_path(self, path):
        path = SimpleHTTPRequestHandler.translate_path(self, path)
        relpath = os.path.relpath(path, os.getcwd())
        print(relpath)
        if (relpath == '.') or ('css' in relpath) or ('html' in relpath) or ('png' in relpath.lower()) or ('jpg' in relpath.lower()) or ('js' in relpath):
            fullpath = os.path.join(self.server.base_path, relpath)
        else:
            fullpath = os.path.join(self.server.base_path, f'{relpath}.html')
        print(fullpath)
        return fullpath


class HTTPServer(BaseHTTPServer):
    """The main server, you pass in base_path which is the path you want to serve requests from"""

    def __init__(self, base_path, server_address, RequestHandlerClass=HTTPHandler):
        self.base_path = base_path
        BaseHTTPServer.__init__(self, server_address, RequestHandlerClass)


web_dir = os.path.dirname(__file__)
httpd = HTTPServer(web_dir, ("", 8000))
httpd.serve_forever()