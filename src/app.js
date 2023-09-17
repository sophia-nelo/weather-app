let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector("#day").innerHTML = `${day} ${hour} : ${minutes}`;

function searchCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
  &appid=f09d3949047ab6c9e3bcaf79cf61f619&units=metric`;
  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-text").value;
  searchCity(city);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}°c`;
  console.log(response);
  let humid = document.querySelector("#humidity");
  humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = `Humidity ${humidity}%`;
  let wind = document.querySelector("#wind");
  windRate = response.data.wind.speed;
  wind.innerHTML = `Wind ${windRate}km/h`;

  let weather = document.querySelector("#description");
  weatherDescription = response.data.weather[0].description;
  weather.innerHTML = weatherDescription;
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

function searchlocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat
 =${position.coords.latitude}&lon=${position.coords.longitude}
  &appid=f09d3949047ab6c9e3bcaf79cf61f619&units=metric`;
  axios.get(url).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Lagos");
