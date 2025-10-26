import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = 'ad0301d126375c990c685de4d875c8c4';

function WeatherAppTailwind() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

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

      setHasSearched(true);
    };

     const resetApp = () => {
          setCity('');
          setWeather(null);
          setError(null);

          setHasSearched(false);

      };

      const inputRef = useRef();

      useEffect(() => {
        inputRef.current?.focus();
      }, [weather, error]);


    const icon = weather?.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      : null;

          const getBackgroundClass = () => {
        if (!weather) return 'from-amber-200 via-yellow-500 to-orange-700';
        const main = weather.weather[0].main.toLowerCase();
        if (main.includes('rain')) return 'from-blue-900 via-gray-700 to-gray-900';
        if (main.includes('cloud')) return 'from-gray-400 via-gray-600 to-gray-800';
        if (main.includes('clear')) return 'from-yellow-400 via-orange-500 to-pink-600';
        if (main.includes('snow')) return 'from-blue-200 via-white to-blue-300';
        if (main.includes('thunder')) return 'from-purple-700 via-gray-800 to-black';
        return 'from-sky-500 via-indigo-500 to-purple-500';
      };

  return (
      <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} text-amber-100 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-700 font-sans rounded-3xl`}
    >


    {/* TITLE + SEARCH CONTAINER */}
      <motion.div
        layout
        animate={{
          y: hasSearched ? -30 : 0,
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col items-center gap-3 sm:gap-4 w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg tracking-wide text-amber-700"
        >
          Weather App
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          layout
          animate={{
            scale: hasSearched ? 0.95 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col sm:flex-row w-full max-w-md bg-white bg-opacity-20 rounded-xl overflow-hidden shadow-lg backdrop-blur-md"
        >
          <input
            ref={inputRef}
            type="text"
            className="grow px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none text-base sm:text-lg"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          />

          <div className="flex flex-row sm:flex-row">
            <button
              className="flex-1 px-5 py-3 sm:px-6 sm:py-4 bg-orange-400 text-white font-semibold hover:bg-orange-500 active:scale-95 transition sm:rounded-none"
              onClick={fetchWeather}
            >
              Search
            </button>

            <button
              className="flex-1 px-5 py-3 sm:px-6 sm:py-4 bg-amber-700 text-white font-semibold hover:bg-amber-800 active:scale-95 transition sm:rounded-none"
              onClick={resetApp}
            >
              Refresh
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-lg sm:text-xl animate-pulse text-center">Loading...</p>
      )}
      {error && (
        <p className="text-lg sm:text-xl text-red-400 text-center mb-4">
          Error: {error}
        </p>
      )}

      {/* Weather Card */}
      <AnimatePresence mode="wait">
        {weather && (
          <motion.div
            key={weather.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white bg-opacity-20 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm hover:scale-105 transform transition-all duration-500"
          >
            {icon && (
              <motion.img
                src={icon}
                alt={weather.weather[0].description}
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}

            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 drop-shadow-sm text-blue-300">
              {weather.name}, {weather.sys?.country}
            </h2>

            <p className="text-xl sm:text-2xl text-blue-300 font-semibold mb-1">
              🌡️ {Math.round(weather.main?.temp)}°C
            </p>

            <p className="text-base sm:text-lg capitalize mb-3 text-blue-300">
              {weather.weather?.[0]?.description}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
              <div className="bg-yellow-100 text-blue-300 bg-opacity-20 rounded-lg p-2 sm:p-3">
                Feels like: {Math.round(weather.main?.feels_like)}°C
              </div>
              <div className="bg-yellow-100 text-blue-300 bg-opacity-20 rounded-lg p-2 sm:p-3">
                Wind: {weather.wind?.speed} m/s
              </div>
              <div className="bg-yellow-100 text-blue-300 bg-opacity-20 rounded-lg p-2 sm:p-3">
                Humidity: {weather.main?.humidity}%
              </div>
              <div className="bg-yellow-100 text-blue-300 bg-opacity-20 rounded-lg p-2 sm:p-3">
                Pressure: {weather.main?.pressure} hPa
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WeatherAppTailwind;
