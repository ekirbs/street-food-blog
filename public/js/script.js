const streetFoodApiKey =`http://data.streetfoodapp.com/1.1/`;
const mapApiKey = "";
const weatherApiKey = "3044316f6126db93462603440b6cd43c";


function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  // renderHistory();
};

init();

async function displayStreetFoodInfo() {
var streetFoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/boston/`;
console.log(streetFoodApiUrl);
fetch(streetFoodApiUrl, {
  method: "GET",
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  // mode: 'cors'
})  
.then((response) => {
  return response.json();
})
.then((response) => {
  console.log(response);
})
}
displayStreetFoodInfo();





