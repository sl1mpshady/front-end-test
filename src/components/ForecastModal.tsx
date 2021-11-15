import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

import { useGlobalContext } from "../context/global";

import WeatherCard from "./WeatherCard";
import ForecastDay from "./ForecastDay";

import Loader from "./Loader";

const ForecastPopup = () => {
  const {
    selectedCity,
    setSelectedCity,
  }: {
    selectedCity?: CityWeather | undefined;
    setSelectedCity: Dispatch<SetStateAction<CityWeather | undefined>>;
  } = useGlobalContext();

  return ReactDOM.createPortal(
    <div className="modal">
      <div
        className={`body ${selectedCity!.weather!.is_day ? "day" : "night"}`}
      >
        <WeatherCard key={selectedCity!.city} cityWeather={selectedCity!} />
        {selectedCity !== undefined && selectedCity!.forecasts?.length === 0 ? (
          <Loader />
        ) : (
          <div className="forecasts">
            {selectedCity!.forecasts!.map((forecast) => (
              <ForecastDay
                key={forecast.city + forecast.weather.last_updated}
                forecast={forecast}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("root") as Element
  );
};

export default ForecastPopup;
