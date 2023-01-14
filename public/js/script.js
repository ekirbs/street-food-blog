function init() {
  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd MMM DD, YYYY [-] h:mm:ss a"));
  }, 1000);

  renderHistory();
}

init();