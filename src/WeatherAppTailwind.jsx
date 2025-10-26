import React, { useState } from 'react';

const API_KEY = 'YOUR_API_KEY_HERE'; // replace with your OpenWeatherMap API key

function WeatherAppTailwind() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-700 text-black flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-lg text-red-200">Error: {error}</p>}
      {weather && (
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            {weather.name}, {weather.sys?.country}
          </h2>
          <p className="text-lg">Temperature: {weather.main?.temp}°C</p>
          <p className="text-lg">Feels like: {weather.main?.feels_like}°C</p>
          <p className="text-lg">
            Weather: {weather.weather?.[0]?.main} - {weather.weather?.[0]?.description}
          </p>
          <p className="text-lg">Wind speed: {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherAppTailwind;
