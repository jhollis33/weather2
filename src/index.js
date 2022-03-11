function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes =`0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`
}

let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime); 

function search(city) {
  let units =`imperial`;
  let apiKey = `97236e698e0031e5f812a329a0ec9ea5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

search("Chicago");

function displayWeatherCondition(response){
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(location);
}

function location(position) {
    let units =`imperial`;
    let apiKey = `97236e698e0031e5f812a329a0ec9ea5`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeatherCondition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

