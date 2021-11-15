import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext, GlobalContext } from "../context";

import ForecastContent from "../components/ForecastContent";

import { user, cities } from "./mocks";

test("renders modal for Paris and expects loading spinner", () => {
  const { container } = render(
    <AuthContext.Provider
      value={{
        user,
        setUser: (value) => {},
      }}
    >
      <GlobalContext.Provider
        value={{
          cityWeathers: cities,
          selectedCity: cities[0],
          setSelectedCity: (value) => {},
        }}
      >
        <ForecastContent />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );

  const linkElement = screen.getByText("Paris");
  expect(linkElement).toBeInTheDocument();

  expect(container.querySelector(".lds-ring")).toHaveClass("lds-ring");
});

test("renders modal for London and expects with 2 day forecast", () => {
  const { container } = render(
    <AuthContext.Provider
      value={{
        user,
        setUser: (value) => {},
      }}
    >
      <GlobalContext.Provider
        value={{
          cityWeathers: cities,
          selectedCity: cities[1],
          setSelectedCity: (value) => {},
        }}
      >
        <ForecastContent />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );

  const textsShouldBeFound = [
    "London",
    "Tuesday",
    "Wednesday",
    "Nov 16",
    "Nov 17",
    "Partly cloudy",
    "Sunny",
  ];

  textsShouldBeFound.forEach((text) => {
    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
  });

  const humidityElements = screen.getAllByText("Humidity");
  expect(humidityElements).toHaveLength(3);
});
