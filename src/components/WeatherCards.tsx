import React from "react";
import WeatherCard from "./WeatherCard";
import { useGlobalContext } from "../context/global";

const Weathers = () => {
  const { cityWeathers }: { cityWeathers: CityWeather[] } = useGlobalContext();
  return (
    <div className="weather-cards">
      {cityWeathers.map((cityWeather) => (
        <WeatherCard key={cityWeather.city} cityWeather={cityWeather} />
      ))}
    </div>
  );
};

export default Weathers;
