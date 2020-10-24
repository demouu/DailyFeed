// Our JavaScript goes here

// WeatherBit API
var weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=" + weatherbitCity + "key=aa00598f57b74bddb364a7b526faf997";
var weatherbitCity = "";
// MapQuest API Global Variables
var locationBtn = $("#location-btn");
var cityEl = $("#location");
var userLat;
var userLong;
var mapURL;
// Associated Press API Global Variables

// Covid19API Global Variables

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationEl.innerHTML = "Geolocation is not supported by this browser.";
    };
};

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    mapURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong
};
getLocation();

// This ajax must run AFTER user allows geolocation; that's why it's behind a button
locationBtn.on('click', function () {

    $.ajax({
        url: mapURL,
        method: "GET"
    }).then(function (response) {
        cityEl.text("You live in " + (response.results[0].locations[0].adminArea5) + ".");
    });
})