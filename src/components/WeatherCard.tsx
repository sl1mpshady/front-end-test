import React, { useCallback, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "../context/global";

const WeatherCard = ({ cityWeather }: { cityWeather: CityWeather }) => {
  const {
    selectedCity,
    setSelectedCity,
  }: {
    selectedCity?: CityWeather | undefined;
    setSelectedCity: Dispatch<SetStateAction<CityWeather | undefined>>;
  } = useGlobalContext();
  const {
    city,
    weather: {
      temp_c,
      temp_f,
      humidity,
      is_day,
      condition: { icon, text },
    },
  } = cityWeather;

  const onClick = useCallback(
    () => setSelectedCity(selectedCity === undefined ? cityWeather : undefined),
    [cityWeather, selectedCity, setSelectedCity]
  );

  return (
    <div
      className={`weather-card ${is_day ? "day" : "night"}`}
      onClick={onClick}
    >
      <div className="text">{text}</div>
      <div className="icon">
        <img src={icon} alt={cityWeather.city} />
      </div>
      <div className="temp">
        {temp_c}
        <div className="degrees">°C</div>
      </div>
      <div className="city">{city}</div>
      <div className="sub-details">
        <div className="item">
          <div className="title">Humidity</div>
          <div className="value">
            {humidity}
            <div className="degrees">%</div>
          </div>
        </div>
        <div className="item">
          <div className="title">Farenheit</div>
          <div className="value">
            {temp_f}
            <div className="degrees">°F</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherCard;
