function displayChosenCity() {

  var streetFoodApiURL = `http://data.streetfoodapp.com/1.1/schedule/boston`;

  fetch(streetFoodApiURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let name = v[1].name;
      $("#vendor-name").append(`<h3 style="text-decoration: underline">${name}</h3>`);

      let website = v[1].url;
      $("#vendor-name").append(`<a href="${website}">${website}</a>`);

      let description = v[1].description;
      $("#vendor-description-card").append("<br/>" + "Vendor Description" + "<br/>" + description + "<br/>");

    })
  };

  displayChosenCity();