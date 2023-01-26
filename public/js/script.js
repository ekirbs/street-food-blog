let data = [];
let vendorZoom;

function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);
};
init();

async function displayStreetFoodInfo() {
  await fetch('/api/streetfood')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log(response);
      const vendors = response.vendors;

      const vendorList = Object.entries(vendors);
      for (const v of vendorList) {
        if (v[1].images) {
          console.log(v[1].images.logo_small);
          data.push({
            lat: v[1].last.latitude,
            long: v[1].last.longitude,
            name: v[1].name,
            address: v[1].last.display,
            ratings: v[1].rating,
            website: v[1].url,
            description: v[1].description,
            payment_methods: v[1].payment_methods,
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
            payment_methods: v[1].payment_methods,
            phone: v[1].phone,
            email: v[1].email
          });
        }




      }




      return data;

    })
      //  console.log(data);
}

function displayVendorInfo(vendor) {
  let newPayement = [];
  for (const v of vendor.payment_methods) {
    let payment = v.replace(/_/g, " ");
    newPayement.push(payment);
  };
  
  const image = {
    url: vendor.logo,
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(50, 50),
  };
  
  vendorZoom = {lat: vendor.lat, lng: vendor.long};
  initMap();
  // console.log(vendor);
  let name = vendor.name;
  $("#vendor-name").empty();
  $("#vendor-name").append(`<h3>${name}</h3>`);
  if(vendor.logo){
    $("#vendor-name").append(`<img src="${vendor.logo}" id="logo "alt="logo" width="50" height="50">`);
  } else {
    $("#vendor-name").append(`<img src="https://cdn-icons-png.flaticon.com/512/651/651107.png" id="logo" alt="logo" width="50" height="50">`);
  }
  

  let website = "https://" + vendor.website;


  let description = vendor.description;
  $("#vendor-description-card").empty();
  $("#vendor-description-card").append("<br/>" + "Vendor Description:" + "<br/>" + description + "<br/>");

  let payment = vendor.payment_methods;
  $("#vendor-payment-card").empty();
  if(vendor.payment_methods){
    $("#vendor-payment-card").append("<br/>" + "Vendor Payment Methods:" + "<br/>" + newPayement + "<br/>");
  } else {
    $("#vendor-payment-card").append("<br/>" + "Vendor Payment Methods:" + "<br/>" + "Cash" + "<br/>");
  }
  

  let address = vendor.address;
  $("#vendor-directions-card").empty();
  $("#vendor-directions-card").append("<br/>" + "Vendor Location:" + "<br/>" + address + "<br/>");

  let phone = vendor.phone;
  let email = vendor.email;
  $("#vendor-contact-card").empty();
  $("#vendor-contact-card").append("<br/>" + "Vendor Phone Number:" + "<br/>" + phone + "<br/>" + "Vendor Email Address:" + "<br/>" + email + "<br/>" + `<a href="${website}">${website}</a>`);

  let ratings = vendor.ratings;
  $("#vendor-rating-card").empty();
  $("#vendor-rating-card").append("<br/>" + "Vendor ratings:" + "<br/>" + ratings);
}

$(".dropdown-menu").on("click", function (event) {
  event.preventDefault();
  id = event.target.id;
  const selectedVendor = data.find(element => element.name == id);
  displayVendorInfo(selectedVendor);
});

// Initialize and add the map
async function initMap() {
  await displayStreetFoodInfo();
  const boston = { lat: 42.3601, lng: -71.0589 };
  // The map, centered at Boston
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
  // The marker, positioned at Boston
  for (const vendor of data) {
    const image = {
      url: vendor.logo,
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(50, 50),
    };

    const image2 = {
      url: "https://cdn-icons-png.flaticon.com/512/651/651107.png",
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(50, 50),
    };

    const pos = { lat: vendor.lat, lng: vendor.long };
    const infoWindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker();
    if (vendor.logo) {
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: vendor.name,
        optimized: false,
        icon: image,
      });
    } else {
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: vendor.name,
        optimized: false,
        icon: image2,
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



// WEATHER DISPLAY FROM HISTORY FUNCTION
async function displayWeather() {

  

  const units = "imperial";
  const lang = "en";

  $("#feature-spot").empty();

  $("#weather").empty();

  $('#weather-day-0').empty();
  $('#weather-day-1').empty();
  $('#weather-day-2').empty();
  $('#weather-day-3').empty();
  $('#weather-day-4').empty();

  

  await fetch('/api/weather')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Data: "+data);
      const featureCard = $("<div class='feature-card zoom'>");
      const nameCard = $("<div>");

      const name = data.city.name;
      const city = $("<h3>").text(`Weather Forecast: ${name}`);
      nameCard.append(city);

      var dateDisplay = $("<h4 class='card-text'>").text(dayjs().format("M/D/YYYY"));
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
      $("#weather-forecast-header").append(nameCard);

      for (var i = 0; i < 5; i += 1) {
        let day = i * 8;
        let count = i;

        let weatherArticle = $(`<div id="article${count}" class="weather zoom">`);

        $(`#weather-day-${count}`).append(weatherArticle);

        var dateDisplay = $("<h5 class='card-text'>").text(dayjs().add(i + 1, "day").format("M/D/YYYY"));
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

window.onscroll = function() {stickNav()};

// Get the navbar
var navbar = document.getElementById("navbar");
var main = document.getElementById("main");


// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    main.classList.add("main-scroll");
    
  } else {
    navbar.classList.remove("sticky");
    main.classList.remove("main-scroll");
    
  }
}