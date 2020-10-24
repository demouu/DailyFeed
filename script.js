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

// Asks permission to get user's location data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function() {
            cityEl.text("Please refresh the page and allow location services for the app to function properly.")
        });
    } else {
        cityEl.text("Geolocation is not supported by the browser.")
    };
};

// If user gives location permission, coords are sent to mapquest API
function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    mapURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong;
    $.ajax({
        url: mapURL,
        method: "GET"
    }).then(function (response) {
        cityEl.text("You live in " + (response.results[0].locations[0].adminArea5) + ".");
    });
};
getLocation();