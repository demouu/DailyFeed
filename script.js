// Our JavaScript goes here
$(document).ready(function () {
    // WeatherBit API
    var icon = $("<i>");
    var tempDiv = $("#temperature");
    var tempIcon = $("#temp-icon");
    var weather = $("#description");
    var weatherImg = $("<img>");
    var uvDiv = $("#uv");
    var uvIcon = $("<i class=\"fas fa-sun\">");
    // MapQuest API Global Variables
    var cityEl = $("#location");
    var userLat;
    var userLong;
    // GuardianAPI Global Variables
    var guardianSearch;
    var searchBtn = $("#search-btn");
    var articles = $("#articles");
    var savedArticles = $("#saved-articles");
    var renderSave = JSON.parse(localStorage.getItem("savearticle")) || [];
    function loadNewsDoc () {
        $.ajax({
        url: "https://content.guardianapis.com/search?show-fields=headline,thumbnail&api-key=199bdec0-409f-48d7-a79a-6ff10791c23e",
        method: "GET"
        }).then(function(response){
            console.log(response);
            for (i = 0; i < 10; i++){
                articles.append("<hr>");
                var articleDiv = $("<div>");
                var saveBtn = $("<button>");
                var saveIcon = $("<i class=\"fas fa-save\"></i>")
                articleDiv.attr("class", "clearfix");
                saveBtn.attr({
                    type: "button",
                    class: "btn btn-outline-primary saveBtn",
                    style: "float:right;border-color:midnightblue"
                });
                saveBtn.append(saveIcon);
                var story = $("<a>");
                story.attr({
                    href: response.response.results[i].webUrl,
                    class: "guardian-headline",
                    target: "_blank"
                });
                var guardianImg = $("<img>");
                guardianImg.attr({
                    src: response.response.results[i].fields.thumbnail,
                    id: "guardian-img"
                });
                story.text(response.response.results[i].fields.headline);
                articleDiv.append(guardianImg, story, saveBtn);
                articles.append(articleDiv);
            };
            $(".saveBtn").on("click", function() {
                savedArticles.push(renderSave);
                localStorage.setItem("savearticle", JSON.stringify(savedArticles));
                var newsHref = this.parentElement.children[1].href;
                var newsTitle = this.parentElement.children[1].innerHTML;
                var savedArticleDiv = $("<div>");
                var newsLink = $("<a>");
                var deleteBtn = $("<button>");
                savedArticleDiv.addClass("clearfix saved-article");
                deleteBtn.addClass("btn btn-outline-danger");
                deleteBtn.attr("style", "float: right");
                deleteBtn.append("Delete");
                newsLink.attr({
                    href: newsHref,
                });
                newsLink.append(newsTitle);
                savedArticleDiv.append(newsLink, deleteBtn);
                savedArticles.append(savedArticleDiv);
                savedArticles.append($("<hr>"));
                $(".btn-outline-danger").on("click", function () {
                    this.parentElement.nextElementSibling.remove();
                    this.parentElement.remove();
                });
            });
        });
    };
    
    loadNewsDoc();
    searchBtn.on('click', function (event) {
        event.preventDefault();
        guardianSearch = $("#news-search").val().trim();
        articles.empty();
        console.log(guardianSearch);
        var guardianFields = "&show-fields=headline,thumbnail";
        $.ajax({
            url: "https://content.guardianapis.com/search?q=" + guardianSearch + guardianFields + "&api-key=199bdec0-409f-48d7-a79a-6ff10791c23e",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.response.results[0]);
            for (i = 0; i < 10; i++) {
                articles.append("<hr>");
                var articleDiv = $("<div>");
                var saveBtn = $("<button>");
                var saveIcon = $("<i class=\"fas fa-save\"></i>")
                articleDiv.attr("class", "clearfix");
                saveBtn.attr({
                    type: "button",
                    class: "btn btn-outline-primary",
                    style: "float:right;border-color:midnightblue"
                });
                saveBtn.append(saveIcon);
                var story = $("<a>");
                story.attr({
                    href: response.response.results[i].webUrl,
                    class: "guardian-headline",
                    target: "_blank"
                });
                var guardianImg = $("<img>");
                guardianImg.attr({
                    src: response.response.results[i].fields.thumbnail,
                    id: "guardian-img"
                });
                story.text(response.response.results[i].fields.headline);
                articleDiv.append(guardianImg, story, saveBtn);
                articles.append(articleDiv);
            };
            $(".saveBtn").on("click", function() {
                localStorage.setItem("savearticle", JSON.stringify(savedArticles));
                var newsHref = this.parentElement.children[1].href;
                var newsTitle = this.parentElement.children[1].innerHTML;
                var savedArticleDiv = $("<div>");
                var newsLink = $("<a>");
                var deleteBtn = $("<button>");
                savedArticleDiv.addClass("clearfix saved-article");
                deleteBtn.addClass("btn btn-outline-danger");
                deleteBtn.attr("style", "float: right");
                deleteBtn.append("Delete");
                newsLink.attr({
                    href: newsHref,
                });
                newsLink.append(newsTitle);
                savedArticleDiv.append(newsLink, deleteBtn);
                savedArticles.append(savedArticleDiv);
                savedArticles.append($("<hr>"));
                $(".btn-outline-danger").on("click", function () {
                    this.parentElement.nextElementSibling.remove();
                    this.parentElement.remove();
                });
            });
        });
    });
    // Asks permission to get user's location data
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, function () {
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
        $.ajax({
            url: "https://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong,
            method: "GET"
        }).then(function (response) {
            cityEl.text((response.results[0].locations[0].adminArea5) + ", " + (response.results[0].locations[0].adminArea3));
            console.log(response);
            getWeather()
        });
    };
    getLocation();
    // Passes user coords into weather api, returns local weather info
    function getWeather() {
        $.ajax({
            url: "https://api.weatherbit.io/v2.0/current?lat=" + userLat + "&lon=" + userLong + "&key=b2da4d28d2ce4023b0d33cbef6a3f959",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("Celsuis temperature: " + response.data[0].temp);
            var tempF = response.data[0].temp * 1.80 + 32;
            console.log("Fahrenheit temperature: " + tempF);
            if (tempF < 60) {
                icon.addClass("fas fa-temperature-low");
                tempIcon.append(icon)
            } else {
                icon.addClass("fas fa-temperature-high");
                tempIcon.append(icon)
            };
            tempDiv.append(" " + tempF.toFixed(0) + "° F");
            weatherImg.attr("src", "icons/" + response.data[0].weather.icon + ".png");
            weather.append(weatherImg);
            weather.append(response.data[0].weather.description);
            uvDiv.append(uvIcon);
            uvDiv.append(" UV i: " + response.data[0].uv.toFixed(1));
        });
    }
    var currentTime = moment().hours();
    console.log(currentTime);
    function updateTime () {
        var morningImg = "https://i.pinimg.com/originals/6d/df/89/6ddf89a95cc31286387b11c64c1991a8.jpg";
        var noonImg = "https://wallpapercave.com/wp/wp2647032.jpg";
        var eveningImg = "https://wallpaperaccess.com/full/429152.jpg";
        i = currentTime;
        if (i >= 6 && i < 12){
            $('#project-name').text("The Morning Feed")
            $('body').css('background-image', "url(" + morningImg + ")")
        } else if (i >= 12 && i < 18){
            $('#project-name').text("The Afternoon Feed")
            $('body').css('background-image', "url(" + noonImg + ")")
        } else {
            $('#project-name').text("The Evening Feed")
            $('body').css('background-image', "url(" + eveningImg + ")")
        };
    }
    updateTime();
})