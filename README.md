# Weather App

A simple weather application built with HTML, JavaScript, and Tailwind CSS.

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature
  - Weather description with icon
  - Feels like temperature
  - Humidity
  - Wind speed
  - Atmospheric pressure
- Responsive design using Tailwind CSS
- Error handling for invalid cities or API issues
- Loading indicator

## API Key Information

The application uses the following WeatherAPI.com API key:
```
f2be8eed8aad492283b180344252704
```

## Setup Instructions

1. Clone or download this repository
2. The app is already configured with the WeatherAPI.com API key shown above
3. If you want to use your own API key:
   - Sign up for a free API key at [WeatherAPI.com](https://www.weatherapi.com/)
   - Open `script.js` and replace the existing API key with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
4. Open `index.html` in your web browser

## Troubleshooting

If you see API errors:
- Double-check that you've entered your API key correctly in script.js
- Test your API key by trying this URL in your browser (replace YOUR_API_KEY with your actual key):
  ```
  https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London
  ```
- If you see JSON with weather data, your key is working

## Technologies Used

- HTML5
- JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [WeatherAPI.com](https://www.weatherapi.com/)
- [Font Awesome](https://fontawesome.com/) icons

## License

MIT 