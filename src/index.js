function showWeather(response) {
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidity = Math.round(response.data.temperature.humidity);
  let pressure = Math.round(response.data.temperature.pressure);
  let wind = Math.round(response.data.wind.speed);
  let weatherIcon = response.data.condition.icon_url;
  let description = response.data.condition.description;

  let currentCity = document.querySelector("#city");
  let currentTemperature = document.querySelector(".current-temp");
  let currentFeelsLike = document.querySelector("#feels-like");
  let currentHumidity = document.querySelector("#humidity");
  let currentPressure = document.querySelector("#pressure");
  let currentWind = document.querySelector("#wind");
  let currentWeatherIcon = document.querySelector(".main-icon");
  let currentDescription = document.querySelector("#description");

  currentCity.innerHTML = city;
  currentTemperature.innerHTML = temperature;
  currentFeelsLike.innerHTML = feelsLike;
  currentHumidity.innerHTML = humidity;
  currentPressure.innerHTML = pressure;
  currentWind.innerHTML = wind;
  currentWeatherIcon.innerHTML = `<img src="${weatherIcon}" alt="weather icon">`;
  currentDescription.innerHTML = description;

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "7f03aa8a08ac7784t49974b7b793o240";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input");

  search(cityElement.value);
}

function getCurrentDate() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let dayOfMonth = date.getDate();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  let currentDay = document.querySelector("#current-day");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");

  currentDay.innerHTML = `${day}`;
  currentDate.innerHTML = `${month} ${dayOfMonth}, ${year}`;
  currentTime.innerHTML = `${hours}:${minutes}`;
}

setInterval(getCurrentDate, 60000);
getCurrentDate();

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7f03aa8a08ac7784t49974b7b793o240";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="forecast-day">
    <div class="forecast-date">${formateDay(day.time)}</div>
    <img src="${day.condition.icon_url}" class="forecast-icon" />
    <div class="forecast-temperatures">
      <div class="forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function changeTheme() {
  let body = document.querySelector("body");

  body.classList.toggle("dark");
}

function setTime() {
  let body = document.querySelector("body");
  let now = new Date();
  if (now.getHours() >= 19 || now.getHours() < 6) {
    body.classList.add("dark");
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

let themeButton = document.querySelector(".theme-toggle");
themeButton.addEventListener("click", changeTheme);

setTime();
search("Odesa");
