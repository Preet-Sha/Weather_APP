// API key for WeatherAPI.com
const API_KEY = 'f2be8eed8aad492283b180344252704';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const date = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Load default city when page loads
window.addEventListener('load', () => {
    // You can set a default city or use geolocation here
    // For now, we'll use a default city
    cityInput.value = 'Punjab';
    getWeather();
});

// Function to get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );
        
        const data = await response.json();
        
        if (!response.ok) {
            if (data.error && data.error.code === 1002) {
                throw new Error('Invalid API key. Please get a valid key from WeatherAPI.com');
            } else if (data.error && data.error.code === 1006) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error(`Error: ${data.error ? data.error.message : 'Unknown error'}`);
            }
        }
        
        displayWeather(data);
    } catch (error) {
        showError(error.message);
        hideWeatherInfo();
        console.error('Weather API Error:', error);
    } finally {
        hideLoading();
    }
}

// Function to display weather data
function displayWeather(data) {
    // Update city name and date
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    const today = new Date();
    date.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Update weather icon - WeatherAPI.com provides icon URLs directly
    weatherIcon.src = `https:${data.current.condition.icon}`;
    
    // Update temperature and description
    temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    description.textContent = data.current.condition.text;
    
    // Update additional weather details
    feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    pressure.textContent = `${data.current.pressure_mb} hPa`;
    
    // Show weather info
    weatherInfo.classList.remove('hidden');
}

// Utility functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function hideWeatherInfo() {
    weatherInfo.classList.add('hidden');
} 