// const streetFoodApiKey = `http://data.streetfoodapp.com/1.1/`;
// const mapApiKey = "";
// const weatherApiKey = "3044316f6126db93462603440b6cd43c";
let data = [];

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
//     console.log(data);
//     console.log(data[0]);
    // displayVendorInfo(data[0]);
}

function displayVendorInfo(vendor) {
  console.log(vendor);
  let name = vendor.name;
  $("#vendor-name").empty();
  $("#vendor-name").append(`<h3 style="text-decoration: underline">${name}</h3>`);

  let website = "https://"+vendor.website;
  

  let description = vendor.description;
  $("#vendor-description-card").empty();
  $("#vendor-description-card").append("<br/>" + "Vendor Description" + "<br/>" + description + "<br/>");

  let address = vendor.address;
  $("#vendor-directions-card").empty();
  $("#vendor-directions-card").append("<br/>" + "Vendor Location" + "<br/>" + address + "<br/>");

  let phone = vendor.phone;
  let email = vendor.email;
  $("#vendor-contact-card").empty();
  $("#vendor-contact-card").append("<br/>" + "Vendor Phone Number" + "<br/>" + phone + "<br/>" + "Vendor Email Address"+ "<br/>" + email + "<br/>" + `<a href="${website}">${website}</a>`);
}

$(".dropdown-menu").on("click", function (event) {
  event.preventDefault();
  id = event.target.id;
  const selectedVendor = data.find(element => element.name == id);
  console.log(selectedVendor);
  displayVendorInfo(selectedVendor);
});

// Initialize and add the map
async function initMap() {
  await displayStreetFoodInfo();
  console.log(data);
  // console.log(data[0]);
  // The location of Uluru
  const boston = { lat: 42.3601, lng: -71.0589 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: boston,
  });
  // The marker, positioned at Uluru
  for(const vendor of data){
    const pos = {lat: vendor.lat, lng: vendor.long};
    const infoWindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: vendor.name,
      optimized: false,
    });
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




