"use client"
import React, { useEffect, useState } from 'react';

interface WeatherData {
  temp: number;
  icon: string;
}

function LocationWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const location = 'Bhubaneswar'; // Change if you want
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // Next.js



  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
);
        const data = await res.json();
        if (data?.main?.temp && data?.weather?.[0]?.icon) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          });
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
      }
    };
    fetchWeather();
  }, [location]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span>{location}</span>
      {weather && (
        <>
          <img src={weather.icon} alt="weather icon" className="w-5 h-5" />
          <span>{weather.temp}°C</span>
        </>
      )}
    </div>
  );
}

export default LocationWeather;
