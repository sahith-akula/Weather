const fetchDataButton = document.getElementById('fetch-data');
const mapContainer = document.getElementById('map-container');
const weatherDataSection = document.getElementById('weather-data');
const errorMessage = document.getElementById('error-message');

fetchDataButton.addEventListener('click', getGeolocation);

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition, handleError);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  displayMap(latitude, longitude);
  fetchWeatherData(latitude, longitude);
}

function handleError(error) {
  let errorMessageText;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessageText = 'Location access denied. Please enable location for this application.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessageText = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      errorMessageText = 'The request to get user location timed out.';
      break;
    default:
      errorMessageText = 'An unknown error occurred.';
  }
  errorMessage.textContent = errorMessageText;
}

function displayMap(latitude, longitude) {
  const map = new google.maps.Map(mapContainer, {
    zoom: 15,
    center: { lat: latitude, lng: longitude }
  });
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map
  });
}

function fetchWeatherData(latitude, longitude) {
  const apiKey = 'd816238edfe0bb7f2540d3f83f8438a1'; 
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${d816238edfe0bb7f2540d3f83f8438a1
  }`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error(error));
}

function displayWeather(data) {
  const currentTemp = data.current.temp;
  const weatherDescription = data.current.weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`; // Construct weather icon URL
  const location = data.lat + ", " + data.lon;
  const windSpeed = data.current.wind_speed;
  const humidity = data.current.humidity;
  const timeZone = data.timezone;
  const pressure = data.current.pressure;
  const windDirection = data.current.wind_deg;
  const uvIndex = data.current.uvi;

  // Update the weather data section with the fetched data
  document.getElementById('location').textContent = `Location: ${location}`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('time-zone').textContent = `Time Zone: ${timeZone}`;
  document.getElementById('pressure').textContent = `Pressure: ${pressure} hPa`;
  document.getElementById('wind-direction').textContent = `Wind Direction: ${windDirection}°`;
  document.getElementById('uv-index').textContent = `UV Index: ${uvIndex}`;
}