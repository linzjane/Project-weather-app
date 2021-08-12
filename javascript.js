let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let today = document.querySelector("#today");
today.innerHTML = `${day}, ${month} ${date}, ${year}`;
let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let apiKey = "779282a2feb268a8ab73225f96fab2da";
  let searchInput = document.querySelector("#enter-city");
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "779282a2feb268a8ab73225f96fab2da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", showCurrentPosition);

function showTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  high = Math.round(response.data.main.temp_max);
  low = Math.round(response.data.main.temp_min);
  let city = response.data.name;
  let place = response.data.sys.country;
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let precipitation = response.data.main.humidity;
  let temp = document.querySelector("#today-temperature");
  temp.innerHTML = `${temperature}˚C`;
  let location = document.querySelector("#your-city");
  location.innerHTML = `${city}, ${place}`;
  let todayHilo = document.querySelector("#today-high-low");
  todayHilo.innerHTML = `${low}/<strong>${high}</strong>˚C`;
  let todaycondition = document.querySelector("#today-condition");
  todaycondition.innerHTML = `Condition: ${condition}`;
  let todayhumidity = document.querySelector("#today-humidity");
  todayhumidity.innerHTML = `Humidity: ${humidity}%`;
  let windspeed = document.querySelector("#today-wind");
  windspeed.innerHTML = `Wind: ${wind}mph`;
  let precipitationchance = document.querySelector("#today-precipitation");
  precipitationchance.innerHTML = `Precipitation: ${precipitation}%`;
}

function changeToFarenheit(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#today-temperature");
  let convertToFarenheit = Math.round((temperature * 9) / 5 + 32);
  celciusTemp.innerHTML = `${convertToFarenheit}˚F`;
  let todayHiloF = document.querySelector("#today-high-low");
  converttodayHiF = Math.round((high * 9) / 5 + 32);
  converttodayLoF = Math.round((low * 9) / 5 + 32);
  todayHiloF.innerHTML = `${converttodayLoF}/<strong>${converttodayHiF}</strong>˚F`;
}
let tempFarenheit = document.querySelector("#change-to-farenheit");
tempFarenheit.addEventListener("click", changeToFarenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#today-temperature");
  let convertToCelcius = temperature;
  fahrenheitTemp.innerHTML = `${convertToCelcius}˚C`;
  let todayHiloC = document.querySelector("#today-high-low");
  converttodayHiC = high;
  converttodayLoC = low;
  todayHiloC.innerHTML = `${converttodayLoC}/<strong>${converttodayHiC}</strong>˚C`;
}
let tempCelsius = document.querySelector("#change-to-celsius");
tempCelsius.addEventListener("click", changeToCelsius);
