import React, { useState } from 'react';

const API_KEY = 'ad0301d126375c990c685de4d875c8c4';

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
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error(data.message);
        }

        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    const icon = weather?.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      : null;

          const getBackgroundClass = () => {
        if (!weather) return 'from-sky-500 via-indigo-500 to-purple-500';
        const main = weather.weather[0].main.toLowerCase();
        if (main.includes('rain')) return 'from-blue-900 via-gray-700 to-gray-900';
        if (main.includes('cloud')) return 'from-gray-400 via-gray-600 to-gray-800';
        if (main.includes('clear')) return 'from-yellow-400 via-orange-500 to-pink-600';
        if (main.includes('snow')) return 'from-blue-200 via-white to-blue-300';
        if (main.includes('thunder')) return 'from-purple-700 via-gray-800 to-black';
        return 'from-sky-500 via-indigo-500 to-purple-500';
      };

  return (
    <div className={`min-h-screen bg-linear-to-br ${getBackgroundClass()} text-amber-100 flex flex-col items-center justify-start py-10 px-4 sm:px-6 transition-all duration-700 font-sans`}>

      <h1 className="text-4xl font-extrabold mb-8 sm:text-5xl text-center drop-shadow-lg tracking-wide">Weather App</h1>

        <div className="flex flex-col sm:flex-row w-full max-w-md bg-white bg-opacity-20 rounded-xl overflow-hidden shadow-lg backdrop-blur-md mb-8">
          <input
            type="text"
            className="grow px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          />
          
          <button
            className="px-6 py-3 bg-orange-400 text-white font-semibold hover:bg-orange-500 active:scale-95 transition"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>

        {loading && <p className="text-lg sm:text-xl animate-plus">Loading...</p>}
          {error && <p className="text-lg sm:text-xl text-red-400">Error: {error}</p>}

            {weather && (
              <div className="bg-amber-50 bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transition-all duration-500 hover:scale-105">
              
                {icon && (
                  <img
                    src={icon}
                    alt={weather.weather[0].description}
                    className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
                  />
                )}
                
                <h2 className="text-3xl font-semibold mb-2 drop-shadow-sm text-blue-300">
                  {weather.name}, {weather.sys?.country}
                </h2>

                <p className="text-2xl text-blue-300 font-semibold">🌡️ {Math.round(weather.main?.temp)}°C</p>

                <p className="text-lg capitalize mb-2 text-blue-300">{weather.weather?.[0]?.description}</p>

                 <div className="grid grid-cols-2 gap-2 mt-4 text-sm sm:text-base">
                  <div className="bg-white text-blue-300 bg-opacity-20 rounded-lg p-2">
                    Feels like: {Math.round(weather.main?.feels_like)}°C
                  </div>

                    <div className="bg-white text-blue-300 bg-opacity-20 rounded-lg p-2">
                      Wind: {weather.wind?.speed} m/s
                    </div>

                      <div className="bg-white text-blue-300 bg-opacity-20 rounded-lg p-2">
                        Humidity: {weather.main?.humidity}%
                      </div>

                        <div className="bg-white text-blue-300 bg-opacity-20 rounded-lg p-2">
                          Pressure: {weather.main?.pressure} hPa
                        </div>
              </div>
          </div>
      )}

    </div>
  );
}

export default WeatherAppTailwind;
