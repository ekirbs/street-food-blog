

const streetFoodApiKey = `http://data.streetfoodapp.com/1.1/`;
const mapApiKey = "";
const weatherApiKey = "3044316f6126db93462603440b6cd43c";
let data = [];

function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  // renderHistory();
};

init();

async function displayStreetFoodInfo() {
 // fetch('/api/streetfood') => //front end does the other stuff
  var streetFoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/boston/`;
  console.log(streetFoodApiUrl);
  await fetch(streetFoodApiUrl, {
    method: "GET",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    // mode: 'cors'
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      const vendors = response.vendors;
      
      const vendorList = Object.entries(vendors);
      console.log(vendors);
      for (const v of vendorList) {



        // Need to find a way of getting the icons pulled from api
        data.push({
          lat: v[1].last.latitude,
          long: v[1].last.longitude,
          name: v[1].name,
          address: v[1].last.display,
          ratings: v[1].ratings,
          website: v[1].url,
          description: v[1].description,
          phone: v[1].phone,
          email: v[1].email
        });



      }

      
      
      return data;

    })
    console.log(data);
    console.log(data[0]);
    displayVendorInfo(data[0]);
}
displayStreetFoodInfo();
function displayVendorInfo(vendor) {
  console.log(vendor);
  let name = vendor.name;
  $("#vendor-name").append(`<h3 style="text-decoration: underline">${name}</h3>`);

  let website = vendor.url;
  $("#vendor-name").append(`<a href="${website}">${website}</a>`);

  let description = vendor.description;
  $("#vendor-description-card").append("<br/>" + "Vendor Description" + "<br/>" + description + "<br/>");

  let address = vendor.address;
  $("#vendor-directions-card").append("<br/>" + "Vendor Location" + "<br/>" + address + "<br/>");

  let phone = vendor.phone;
  let email = vendor.email;
  $("#vendor-contact-card").append("<br/>" + "Vendor Phone Number" + "<br/>" + phone + "<br/>" + "Vendor Email Address"+ "<br/>" + email);
}


// Initialize and add the map
async function initMap() {
  await displayStreetFoodInfo();
  console.log(data[0]);
  // The location of Uluru
  const boston = { lat: 42.3601, lng: -71.0589 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: boston,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: boston,
    map: map,
  });
}

window.initMap = initMap;




// displayStreetFoodInfo();



// displayVendorInfo(data);




