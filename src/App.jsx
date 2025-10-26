import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import WeatherAppTailwind from './WeatherAppTailwind';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;


function App() {
  return <WeatherAppTailwind />;
}

export default App;
