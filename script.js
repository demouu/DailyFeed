// Our JavaScript goes here
var zomatoCityID = "";
var zomatoQuery = "";
var zomatoLat = "";
var zomatoLon = "";
var weatherbitCity = "";

var zomatoURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityID + "&entity_type=city&q=" + zomatoQuery + "&count=10&lat=" + zomatoLat + "&lon=" + zomatoLon + "&radius=10000&sort=rating&order=desc";
var weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=" + weatherbitCity + "key=aa00598f57b74bddb364a7b526faf997";
var uberURL = "";

var zomSearch = $("#search-btn");
var zomInput = $("#zomatoInput").val();

function zomatoCall () {
    $.ajax({
        header: {
            'user-key': '54aedad9a5cf457cabacf6702d606833',
            'Accept': 'application/json'
        },
        url: zomatoURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}
$(zomSearch).on('click', function (event) {
    event.preventDefault();
    zomSearch = zomInput;
    zomatoCall();
});

function zomatoSearch() {

};
zomatoSearch();

var userLat;
var userLong;
var mapURL;


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
locationBtn.on('click', function() {

    $.ajax({
        header: {
            'user-key': 'jHLf4uATR4fijVkLOmrimhIJE79Xp0kx'
        },
        url: mapURL,
        method: "GET"
    }).then(function(response) {
        cityEl.text("You live in " + (response.results[0].locations[0].adminArea5) + ".");
    });
})