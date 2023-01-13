// GLOBAL VARIABLES
var parkApiKey = "amkrsfXuAU5bolqQY0bTMOV4h2mBIOTqrRvrJVsd";
var weatherApiKey = "3044316f6126db93462603440b6cd43c";
var units = "imperial";
var lang = "en";
var lat;
var lon;
var park;

// TIME & SEARCH HISTORY DISPLAY FUNCTION ON PAGE LOAD
function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  renderHistory();
}

init();

// DROPDOWN FUNCTION
$(function () {
  $(".dropdown-trigger").dropdown();
  $(".sub").dropdown({
    hover: true,
  });
});

// SLIDESHOW FUNCTION (NEEDS WORK)
// var images = data.data[0].images;

// var imagesLength = images.length;

// for (var i = 0; i < images.length; i++) {

//   var slideContainer = $('<div class="mySlides fade">')
//   $('.slideshow-container').append(slideContainer);

//   var numberDiv = $('<div class="numbertext">').text(`${i + 1}/${imagesLength}`);
//   slideContainer.append(numberDiv);

//   var imgSrc = data.data[0].images[i].url;
//   var img = $(`<img src="${imgSrc}" id="icon">`)
//   // var img = $('<img>').src(`${imgSrc}`);
//   // var img = $('<img src="data.data[0].images[i]">')  // how to source the images from the data?
//   slideContainer.append(img);

//   var capName = data.data[0].images[i].name;
//   var textDiv = $('<div class="text">').text(`${capName}`);
//   slideContainer.append(textDiv);

//   var dotSpan = $('<span class="dot" onclick="currentSlide[i + 1]">')
//   $('#dotContainer').append(dotSpan);
// }

// WEATHER DISPLAY FUNCTION
// $(document).ready(function) {
function displayChosenPark() {
  $("#park-name").empty();
  $("#activity-card").empty();
  $("#park-weather-card").empty();
  $("#park-description-card").empty();
  $("#park-directions-card").empty();
  $("#contact-park").empty();
  $("#park-hours-card").empty();

  var parkApiURL = `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=${parkApiKey}`;

  fetch(parkApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      lat = data.data[0].latitude.valueOf();
      lon = data.data[0].longitude.valueOf();

      var activities = data.data[0].activities;

      var fullName = data.data[0].fullName;
      $("#park-name").append(`<h3 style="text-decoration: underline">${fullName}</h3>`);
      var url = data.data[0].url;
      $("#park-name").append(`<a href="${url}">${url}</a>`);

      for (var i = 0; i < activities.length; i++) {
        $("#activity-card").append(data.data[0].activities[i].name + "<br/>");
      }
      
      var description = data.data[0].description;

      var weatherReport = data.data[0].weatherInfo;
      
      var streetName = data.data[0].addresses[0].line1;
      var city = data.data[0].addresses[0].city;
      var zip = data.data[0].addresses[0].postalCode;
      var state = data.data[0].addresses[0].stateCode;
      
      var directions = data.data[0].directionsInfo;
      
      var directionsUrl = data.data[0].directionsUrl;
      
      var hours = data.data[0].operatingHours[0].standardHours;
      
      $("#park-description-card").append("<br/>" + "Park Description" + "<br/>" + description + "<br/>");
      $("#park-weather-card").append(weatherReport);
      $("#park-directions-card").append("<br/>" + "Park Address" + "<br/>" + streetName + " " + city + " ," + zip + " ," + state + "<br/>");
      $("#park-directions-card").append("<br/>" + "Park Direction" + "<br/>" + directions + "<br/>");
      $("#contact-park").append("<br/>" + "Park Direction URL" + "<br/>" + directionsUrl + "<br/>");

      $("#park-hours-card").append("<br/>" + "Park Hours" + "<br/>" + 
        "Sunday: " + hours.sunday + "<br/>" + 
        "Monday: " + hours.monday + "<br/>" + 
        "Tuesday: " + hours.tuesday + "<br/>" +
        "Wednesday: " + hours.wednesday + "<br/>" + 
        "Thursday: " + hours.thursday + "<br/>" +
        "Friday: " + hours.friday + "<br/>" +
        "Saturday: " + hours.saturday + "<br/>"
      );

      displayChosenCity();
    });
};

// WEATHER DISPLAY FROM HISTORY FUNCTION
function displayChosenCity() {

  $("#feature-spot").empty();

  $("#weather").empty();

  $('#weather-day-0').empty();
  $('#weather-day-1').empty();
  $('#weather-day-2').empty();
  $('#weather-day-3').empty();
  $('#weather-day-4').empty();

  var weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${units}&lang=${lang}`;

  fetch(weatherApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var featureCard = $("<div class='card feature-card zoom'>");

      var name = data.city.name;
      var city = $("<h4>").text(name);
      featureCard.append(city);

      var dateDisplay = $("<h4>").text(dayjs().format("M/D/YYYY"));
      featureCard.append(dateDisplay);

      var featureImg = $(`<img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" id="icon">`);
      featureCard.append(featureImg);

      var featureBody = $('<div class="card-body">');
      featureCard.append(featureBody);

      var temperature = data.list[0].main.temp;
      var tempDisplay = $('<p class="card-text">').text(`Temp: ${temperature}`);
      featureBody.append(tempDisplay);

      var windSpeed = data.list[0].wind.speed;
      var windDisplay = $('<p class="card-text">').text(`Wind Speed: ${windSpeed}`);
      featureBody.append(windDisplay);

      var humidity = data.list[0].main.humidity;
      var humidDisplay = $('<p class="card-text">').text(`Humidity: ${humidity}`);
      featureBody.append(humidDisplay);

      $("#weather").prepend(featureCard);

      for (var i = 0; i < 5; i += 1) {
        var day = i * 8;
        var count = i;

        var weatherArticle = $(`<div id="article${count}" class="card card-alt-weather zoom">`);

        $(`#weather-day-${count}`).append(weatherArticle);

        var dateDisplay = $("<h5>").text(dayjs().add(i + 1, "day").format("M/D/YYYY"));
        $(`#article${count}`).append(dateDisplay);

        var weatherImg = $(`<img src="http://openweathermap.org/img/w/${data.list[day + 1].weather[0].icon}.png" id="icon">`);
        $(`#article${count}`).append(weatherImg);

        var weatherBody = $(`<div id="weatherBody${count}" class="weather-card-body">`);
        $(`#article${count}`).append(weatherBody);

        var temperature = data.list[day + 1].main.temp;
        var tempDisplay = $('<p class="card-text">').text(`Temp: ${temperature}`);
        $(`#weatherBody${count}`).append(tempDisplay);

        var windSpeed = data.list[day + 1].wind.speed;
        var windDisplay = $('<p class="card-text">').text(`Wind Speed: ${windSpeed}`);
        $(`#weatherBody${count}`).append(windDisplay);

        var humidity = data.list[day + 1].main.humidity;
        var humidDisplay = $('<p class="card-text">').text(`Humidity: ${humidity}`);
        $(`#weatherBody${count}`).append(humidDisplay);
      }
    });
}

// GET LOCALSTORAGE OF SEARCH HISTORY FUNCTION
function getLocalNameStorage() {
  return JSON.parse(localStorage.getItem("cities")) || [];
}
function getLocalCodeStorage() {
  return JSON.parse(localStorage.getItem("code")) || [];
}

// RENDER SEARCH HISTORY FUNCTION
function renderHistory() {
  $("#history-spot").empty();

  var cities = getLocalNameStorage();
  var code = getLocalCodeStorage();

  for (i = 0; i < cities.length; i++) {
    var histButton = $(`<button class="hist-btn btn">`);

    histButton.addClass("hist-btn");

    histButton.attr("data-name", cities[i]);
    histButton.attr("data-code", code[i]);

    histButton.text(cities[i]);

    $("#history-spot").append(histButton);
  }
}

// ON BUTTON CLICK, ADD SEARCHED CITIES TO HISTORY AND RENDER HISTORY & WEATHER
$(".dropdown-btn").on("click", function (event) {
  event.preventDefault();

  var code = getLocalCodeStorage();
  var cities = getLocalNameStorage();

  park = event.target.id;

  var city = event.target.innerHTML;

  if (cities.includes(city)) {
    console.log("already chosen");
  } else {
    cities.push(city);
    code.push(park);

    if (cities.length > 5) {
      cities.shift();
      code.shift();
    }

    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("code", JSON.stringify(code));
  }

  displayChosenPark();
  renderHistory();
});

// WEATHER DISPLAY WHEN SEARCH HISTORY IS CLICKED
$(document).on("click", ".hist-btn", function (event) {

  event.preventDefault();

  park = $(this).attr("data-code");

  displayChosenPark();
});

let slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}