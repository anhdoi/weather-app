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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElelment = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col forecastDate">
                <p class="day">${forecastDay.dt}</p>
                <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
                <div class="forecastTemp">
                 <span id="forecastTempMax">${forecastDay.temp.max}°</span>
                 <span> / </span>
                 <span id="forecastTempMin">${forecastDay.temp.min}°</span>
                </div>
              </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElelment.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e0f527090dba1e8784b184285b285cb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
  console.log();
}

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
  getForecast(response.data.coord);
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

let CDegree = null;

function displayFDegree(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  let FDegree = (CDegree * 9) / 5 + 32;
  tempDisplay.innerHTML = `${Math.round(FDegree)}°F`;
}

let FDegreeLink = document.querySelector("#changeToF");
FDegreeLink.addEventListener("click", displayFDegree);

function displayCDegree(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = `${Math.round(CDegree)}°C`;
}

let CDegreeLink = document.querySelector("#changeToC");
CDegreeLink.addEventListener("click", displayCDegree);

function showCurrentPostion(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentPostion);
