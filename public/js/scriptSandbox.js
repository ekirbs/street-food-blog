function displayChosenCity() {

  var streetFoodApiURL = `http://data.streetfoodapp.com/1.1/schedule/boston`;

  fetch(streetFoodApiURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  };

  displayChosenCity();