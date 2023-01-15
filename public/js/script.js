const streetFoodApiKey = "";
const mapApiKey = "";
const weatherApiKey = "3044316f6126db93462603440b6cd43c";


function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  // renderHistory();
};

init();