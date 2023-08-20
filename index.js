function dateFormat(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
let dayIndex = date.getDay();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[dayIndex];

return `${day} ${hours} :${minutes}`;
}

function searching(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    let cityVal = document.querySelector("#city-input");
    city.innerHTML = cityVal.value;

    let apiKey = "be6ac2acf5f7d216bc7f05782175a8a2"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");

    let celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
}

function fahrenheitConvert(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
}

function celsiusConvert(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=be6ac2acf5f7d216bc7f05782175a8a2`;
    
    axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = dateFormat(currentTime);

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searching);

let fahrenheit = document.querySelector("#fahrenheit-link");

fahrenheit.addEventListener("click", fahrenheitConvert);

let celsius = document.querySelector("#celsius-link");

celsius.addEventListener("click", celsiusConvert);