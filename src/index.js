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

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input");
  let city = cityElement.value;
  let apiKey = "7f03aa8a08ac7784t49974b7b793o240";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
