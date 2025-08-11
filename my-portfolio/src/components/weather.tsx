"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface WeatherData {
  temp: number;
  icon: string;
}

function LocationWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const location = "Bhubaneswar";
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

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
        console.error("Weather fetch error:", error);
      }
    };
    fetchWeather();
  }, [location, apiKey]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span>{location}</span>
      {weather && (
        <>
          <Image
            src={weather.icon}
            alt="weather icon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>{weather.temp}°C</span>
        </>
      )}
    </div>
  );
}

export default LocationWeather;
