let today = document.querySelector(".today");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

today.innerHTML = `${day} ${hour}:${minute}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-box-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;

  let units = "metric";
  let apiKey = "e0f527090dba1e8784b184285b285cb6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

let searchBox = document.querySelector("#searchBox");
searchBox.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city");
  let tempDisplay = document.querySelector("#temp");
  let descriptionDisplay = document.querySelector("#description");
  let iconDisplay = document.querySelector("#iconMain");
  let windSpeedDisplay = document.querySelector("#windspeed");

  CDegree = response.data.main.temp;

  cityDisplay.innerHTML = response.data.name;
  tempDisplay.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  iconDisplay.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windSpeedDisplay.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let units = "metric";
  let apiKey = "e0f527090dba1e8784b184285b285cb6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

let CDegree = null;

function displayFDegree(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  let FDegree = (CDegree * 9) / 5 + 32;
  tempDisplay.innerHTML = `${Math.round(FDegree)}°F`;
}

let fDegreeLink = document.querySelector("#changeToF");
fDegreeLink.addEventListener("click", displayFDegree);
