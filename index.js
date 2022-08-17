function formattedDate(date) {
  let currentDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = currentDays[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let currentDayTime = document.querySelector("#currentDayTime");
let currently = new Date();

currentDayTime.innerHTML = formattedDate(currently);

//
function changeToCelsius(event) {
  event.preventDefault();

  let celsius = document.querySelector(".currentTemp");
  celsius.innerHTML = 22;
}
let celsiusSelected = document.querySelector("#celsius");
celsiusSelected.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();

  let fahrenheit = document.querySelector(".currentTemp");
  fahrenheit.innerHTML = 72;
}

let fahrenheitSelected = document.querySelector("#fahrenheit");
fahrenheitSelected.addEventListener("click", changeToFahrenheit);
//

function updateDetails(response) {
  response.preventDefault;
  document.querySelector(".current").innerHTML = response.data.name;
  document.querySelector(".currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#dayDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "08609be667e09eedb6d9f6006bdd29fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=08609be667e09eedb6d9f6006bdd29fa&units=metric`;

  axios.get(`${apiUrl}`).then(updateDetails);
}

function citySelected(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search").value;
  document.querySelector(".current").innerHTML = `${searchedCity}`;

  search(`${searchedCity}`);
}

let searchform = document.querySelector("#searchengineer");
searchform.addEventListener("submit", citySelected);

search("Sydney");

//

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "08609be667e09eedb6d9f6006bdd29fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateDetails);
}

function currentButton(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", currentButton);
