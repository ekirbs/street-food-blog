// const streetFoodApiKey = `http://data.streetfoodapp.com/1.1/`;
// const mapApiKey = "";
let data = [];
let vendorZoom;
function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  // renderHistory();
};
init();

async function displayStreetFoodInfo() {
  await fetch('/api/streetfood')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      const vendors = response.vendors;

      const vendorList = Object.entries(vendors);
      // console.log(vendors);
      for (const v of vendorList) {



        // Need to find a way of getting the icons pulled from api
        // console.log(v[1].name);
        if (v[1].images) {
          data.push({
            lat: v[1].last.latitude,
            long: v[1].last.longitude,
            name: v[1].name,
            address: v[1].last.display,
            ratings: v[1].rating,
            website: v[1].url,
            description: v[1].description,
            phone: v[1].phone,
            email: v[1].email,
            logo: v[1].images.logo_small
          });
        } else {
          data.push({
            lat: v[1].last.latitude,
            long: v[1].last.longitude,
            name: v[1].name,
            address: v[1].last.display,
            ratings: v[1].rating,
            website: v[1].url,
            description: v[1].description,
            phone: v[1].phone,
            email: v[1].email
          });
        }




      }




      return data;

    })
  //     console.log(data);
  //     console.log(data[0]);
  // displayVendorInfo(data[0]);
}

function displayVendorInfo(vendor) {
  vendorZoom = {lat: vendor.lat, lng: vendor.long};
  initMap();
  console.log(vendor);
  let name = vendor.name;
  $("#vendor-name").empty();
  $("#vendor-name").append(`<h3 style="text-decoration: underline">${name}</h3>`);

  let website = "https://" + vendor.website;


  let description = vendor.description;
  $("#vendor-description-card").empty();
  $("#vendor-description-card").append("<br/>" + "Vendor Description:" + "<br/>" + description + "<br/>");

  let address = vendor.address;
  $("#vendor-directions-card").empty();
  $("#vendor-directions-card").append("<br/>" + "Vendor Location:" + "<br/>" + address + "<br/>");

  let phone = vendor.phone;
  let email = vendor.email;
  $("#vendor-contact-card").empty();
  $("#vendor-contact-card").append("<br/>" + "Vendor Phone Number:" + "<br/>" + phone + "<br/>" + "Vendor Email Address:" + "<br/>" + email + "<br/>" + `<a href="${website}">${website}</a>`);

  let ratings = vendor.ratings;
  $("#vendor-weather-card").empty();
  $("#vendor-weather-card").append("<br/>" + "Vendor ratings:" + "<br/>" + ratings);
}

$(".dropdown-menu").on("click", function (event) {
  event.preventDefault();
  id = event.target.id;
  const selectedVendor = data.find(element => element.name == id);
  // console.log(selectedVendor);
  displayVendorInfo(selectedVendor);
});

// Initialize and add the map
async function initMap() {
  await displayStreetFoodInfo();
  // console.log(data);
  // console.log(data[0]);
  // The location of Uluru
  const boston = { lat: 42.3601, lng: -71.0589 };
  // The map, centered at Uluru
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: boston,
  });
  if(vendorZoom){
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: vendorZoom,
    });
  }
  // The marker, positioned at Uluru
  for (const vendor of data) {
    const pos = { lat: vendor.lat, lng: vendor.long };
    const infoWindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker();
    if (vendor.logo) {
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: vendor.name,
        optimized: false,
        icon: vendor.logo,
      });
    } else {
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: vendor.name,
        optimized: false,
      });
    }

    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  }
}

window.initMap = initMap;


// async function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

// displayStreetFoodInfo();



// displayVendorInfo(data);

// WEATHER DISPLAY FROM HISTORY FUNCTION
function displayWeather() {

  const weatherApiKey = "3044316f6126db93462603440b6cd43c";

  const units = "imperial";
  const lang = "en";

  $("#feature-spot").empty();

  $("#weather").empty();

  $('#weather-day-0').empty();
  $('#weather-day-1').empty();
  $('#weather-day-2').empty();
  $('#weather-day-3').empty();
  $('#weather-day-4').empty();

  const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${weatherApiKey}&units=${units}&lang=${lang}`;

  fetch(weatherApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const featureCard = $("<div class='card feature-card zoom'>");

      const name = data.city.name;
      const city = $("<h4>").text(name);
      featureCard.append(city);

      var dateDisplay = $("<h4>").text(dayjs().format("M/D/YYYY"));
      featureCard.append(dateDisplay);

      let featureImg = $(`<img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" id="icon">`);
      featureCard.append(featureImg);

      let featureBody = $('<div class="card-body">');
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
        let day = i * 8;
        let count = i;

        let weatherArticle = $(`<div id="article${count}" class="card card-alt-weather zoom">`);

        $(`#weather-day-${count}`).append(weatherArticle);

        var dateDisplay = $("<h5>").text(dayjs().add(i + 1, "day").format("M/D/YYYY"));
        $(`#article${count}`).append(dateDisplay);

        let weatherImg = $(`<img src="http://openweathermap.org/img/w/${data.list[day + 1].weather[0].icon}.png" id="icon">`);
        $(`#article${count}`).append(weatherImg);

        let weatherBody = $(`<div id="weatherBody${count}" class="weather-card-body">`);
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
};

displayWeather();