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
}

function search(city) {
  let apiKey = "7f03aa8a08ac7784t49974b7b793o240";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

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

getCurrentDate();

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

search("Odesa");
