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

//Bonus point
function logTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let cityDisplay = document.querySelector("#city");
  let temp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp");
  let description = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector("#description");

  cityDisplay.innerHTML = `${city}`;
  tempDisplay.innerHTML = `${temp}`;
  descriptionDisplay.innerHTML = `${description}`;
}

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let units = "metric";
  let apiKey = "e0f527090dba1e8784b184285b285cb6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(logTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
