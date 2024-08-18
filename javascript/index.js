var i = 0;
var images = [];
var time = 3000;

images[0] = './images/2023_group.jpg';
images[1] = './images/2022_group.JPG';
images[2] = './images/2021_group.png';
images[3] = './images/2020_group.jpg';
images[4] = './images/2019_group.jpg';
images[5] = './images/2017_group.jpg';

function changeImg() {
	document.group_pic.src = images[i]

	if(i < images.length - 1) {
		i++;
	} else {
		i = 0;
	}
	setTimeout('changeImg()', time);
}

window.onload = changeImg;
