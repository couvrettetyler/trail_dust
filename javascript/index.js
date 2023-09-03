//Setup comms to server
function httpPost(theUrl, callback, contentType, message_object) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open('POST', theUrl);
	xmlHttp.callback = callback;
	xmlHttp.setRequestHeader('Content-Type', contentType)
	xmlHttp.onload = function () {
		this.callback.apply(this);
	}
	xmlHttp.send(JSON.stringify(message_object));
}

//After google apis load (for sign in stuff)
function onLoad() {
	gapi.load('auth2', function() {
			gapi.auth2.init();
		});
}

function test_result() {
	console.log(JSON.parse(this.responseText).response);
}

function database_result() {
	console.log(JSON.parse(this.responseText));
}

//Sign out button onclick
function signOut() {
    //var auth2 = gapi.auth2.getAuthInstance();
    //sessionStorage.removeItem('id');
    //auth2.signOut();
}

function test() {
	//httpPost('/test.123', test_result, 'application/json;charset=UTF-8', {thing:'hello'});
	//httpPost('/database.123', database_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'query', operator: '&', column: ['text'], values: ['Does'], params: ['eq'], limit: 3});
	//httpPost('/database.123', database_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'add', item: {text: 'whoah again', text2: 'Yeeeah'}})
	//httpPost('/database.123', database_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'get', id: '00000-00003'});
	//httpPost('/database.123', database_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'delete', id: '00000-00003'});
	httpPost('/database.123', database_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'modify', item: {id: '00000-00002', text: 'Does', text2: 'NONONONONONONONONONO'}});
}

//Starting Location
var starting_location_element = document.getElementById('starting_location');
var starting_location_autocomplete = new google.maps.places.Autocomplete(starting_location_element);
starting_location_autocomplete.setFields(['address_components']);

//Destination Location
var destination_location_element = document.getElementById('destination_location');
var destination_location_autocomplete = new google.maps.places.Autocomplete(destination_location_element);
destination_location_autocomplete.setFields(['address_components']);

//Repeater1: Generates HTML for the repeater
var repeater1Data;
function repeater1_result() {
	repeater1Data = JSON.parse(this.responseText).queried_items;
	var repeater1HTML = "";
	for (var i = 0; i <	repeater1Data.length && i < 5; i++) {
			//repeater1HTML += "<li>" + repeater1Data[i].text + "</li><br>";
			repeater1HTML += 	"<li>" +
									'<p class="repeater1_text">' + repeater1Data[i].id + "</p>" +
									'<p class="repeater1_text2">' + repeater1Data[i]['destination city'] + "</p>" +
								"</li>";
	}
	document.getElementById("repeater1").innerHTML = repeater1HTML;
}
//Queries the database for the first 5 Ride items
httpPost('/database.123', repeater1_result, 'application/json;charset=UTF-8', {database: 'Rides', method: 'query', operator: '&', column: [], values: [], params: [], limit: 5});

function searchButton() {
	var starting_location = JSON.stringify(starting_location_autocomplete.getPlace());
	var destination_location = JSON.stringify(destination_location_autocomplete.getPlace());
	var date = document.getElementById('date').value;
	sessionStorage.setItem('starting_location', starting_location);
	sessionStorage.setItem('destination_location', destination_location);
	sessionStorage.setItem('date', date);
	window.location.href = 'search_rides.html';
}


var id = sessionStorage.getItem('id');
console.log(id);