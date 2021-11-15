import React from "react";

import { days, months } from "../constants";

const ForecastDay = ({ forecast }: { forecast: CityWeather }) => {
  const {
    weather: {
      last_updated,
      humidity,
      temp_c,
      temp_f,
      condition: { text, icon },
    },
    city,
  } = forecast;
  const date = new Date(last_updated);
  const day = days[date.getDay()];
  const dayNum = date.getDate();
  const month = months[date.getMonth()];

  return (
    <div className="day-forecast">
      <div className="condition">{text}</div>
      <div className="details">
        <div className="icon">
          <img src={icon} alt={`${city}-text`} />
        </div>
        <div className="date-info">
          <div className="day">{day}</div>
          <div className="date">
            {month} {dayNum}
          </div>
        </div>
        <div className="temp">
          {temp_c}
          <div className="degrees">°C</div>
        </div>
        <div className="others">
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
      </div>
    </div>
  );
};

export default ForecastDay;
