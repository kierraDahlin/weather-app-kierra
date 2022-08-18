// add a date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currHour = date.getHours();

  if (currHour < 10) {
    currHour = `0${currHour}`;
  }

  let currMin = date.getMinutes();
  if (currMin < 10) {
    currMin = `0${currMin}`;
  }
  let formattedDate = `${currentDay} ${currHour}:${currMin}`;
  return formattedDate;
}

let dateHeading = document.querySelector("#date-heading");
let now = new Date();
dateHeading.innerHTML = formatDate(now);

// search input
let searchForm = document.querySelector("#search-form");

// weather api
let apiKey = "cac27e453346e9164edaf605b6536f2f";
let units = "metric";

// defualt city -- New York (see btm of page)
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

// loads searched city
function handleSumbit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// geo location -- current location button
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function clickCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currLocBtn = document.querySelector("#location-btn");
currLocBtn.addEventListener("click", clickCurrentLocation);

function showTemp(response) {
  unitSpan.innerHTML = "C";
  let currTemp = document.querySelector("#current-temp");
  currTemp.innerHTML = Math.round(response.data.main.temp);

  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let wind = document.querySelector("#wind-li");
  wind.innerHTML = response.data.wind.speed;

  let humidity = document.querySelector("#humidity-li");
  humidity.innerHTML = response.data.main.humidity;

  let low = document.querySelector("#low-temp-li");
  low.innerHTML = Math.round(response.data.main.temp_min);

  let high = document.querySelector("#high-temp-li");
  high.innerHTML = Math.round(response.data.main.temp_max);
}

searchForm.addEventListener("submit", handleSumbit);

// bonus c|f
let unitBtn = document.querySelector("#unit-btn");
let unitSpan = document.querySelector("#unit-span");
function changeUnit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);

  // let unitSpan = document.querySelector("#unit-span");
  if (unitSpan.innerHTML === "C") {
    temperatureElement.innerHTML = Math.round((temp * 9) / 5 + 32);
    unitSpan.innerHTML = "F";
  } else {
    temperatureElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
    unitSpan.innerHTML = "C";
  }
}
unitBtn.addEventListener("click", changeUnit);

searchCity("New York");
// everytime the page loads, it has this default city and calls the searchCity funtion
