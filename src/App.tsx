import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { ReactFacebookLoginInfo } from "react-facebook-login";

import { AuthContext } from "./context/authentication";
import { GlobalContext } from "./context/global";

import { cities } from "./constants";
import Main from "./Main";

const App = () => {
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityWeather>();
  const [user, setUser] = useState<ReactFacebookLoginInfo>();

  useEffect(() => {
    if (user !== undefined) {
      const fetchData = async () => {
        const requests: Promise<AxiosResponse<any, any>>[] = cities.map(
          (city) =>
            axios.get("https://api.weatherapi.com/v1/current.json", {
              params: {
                key: "1263868ed54f4b12a1b133939211411",
                q: city,
                aqi: "no",
              },
            })
        );
        const cityWeathersTemp: CityWeather[] = await axios
          .all(requests)
          .then((response) =>
            response.map(({ data }) => ({
              city: data?.location?.name,
              weather: data?.current,
              forecasts: [],
            }))
          );
        setCityWeathers(cityWeathersTemp);
      };

      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCity !== undefined && selectedCity!?.forecasts?.length === 0) {
      axios
        .get("https://api.weatherapi.com/v1/forecast.json", {
          params: {
            key: "1263868ed54f4b12a1b133939211411",
            q: selectedCity!?.city,
            aqi: "no",
            days: 3,
            alerts: "no",
          },
        })
        .then((response) => {
          const {
            forecast: { forecastday },
          }: { forecast: { forecastday: ForecastReponse[] } } = response.data;

          const tempForecasts: CityWeather[] = forecastday
            .slice(1, forecastday.length)
            .map(
              ({
                date,
                day: { avgtemp_c, avgtemp_f, avghumidity, condition },
              }) => ({
                city: selectedCity!?.city,
                weather: {
                  last_updated: date,
                  temp_c: avgtemp_c,
                  temp_f: avgtemp_f,
                  is_day: false,
                  condition: condition,
                  humidity: avghumidity,
                },
                forecasts: [],
              })
            );

          setSelectedCity({ ...selectedCity, forecasts: tempForecasts });
          setCityWeathers((prevCityWeathers: CityWeather[]) =>
            prevCityWeathers.map((cityWeather: CityWeather) =>
              cityWeather.city === selectedCity!?.city
                ? { ...cityWeather, forecasts: tempForecasts }
                : cityWeather
            )
          );
        });
    }
  }, [selectedCity, cityWeathers]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GlobalContext.Provider
        value={{ cityWeathers, selectedCity, setSelectedCity }}
      >
        <Main />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
