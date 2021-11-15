import React from "react";
import { useAuthContext } from "./context/authentication";
import { useGlobalContext } from "./context/global";

import Login from "./components/Login";
import Header from "./components/Header";
import WeatherCards from "./components/WeatherCards";
import ForecastPopup from "./components/ForecastModal";

const Main = ({ test }: { test?: boolean | false }) => {
  const { user } = useAuthContext();
  const { selectedCity } = useGlobalContext();

  return user === undefined ? (
    <Login test={test} />
  ) : (
    <div className="container">
      <Header />
      <WeatherCards />
      {selectedCity !== undefined && <ForecastPopup />}
    </div>
  );
};

export default Main;
