// API key for OpenWeatherMap
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual OpenWeatherMap API key

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
    cityInput.value = 'New York';
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
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
        hideWeatherInfo();
    } finally {
        hideLoading();
    }
}

// Function to display weather data
function displayWeather(data) {
    // Update city name and date
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    const today = new Date();
    date.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Update temperature and description
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    
    // Update additional weather details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    
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