import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext, GlobalContext } from "../context";
import Main from "../Main";

import { user, cities } from "./mocks";

test("renders weather cards for cities", () => {
  const { getByAltText } = render(
    <AuthContext.Provider
      value={{
        user,
        setUser: (value) => {},
      }}
    >
      <GlobalContext.Provider
        value={{
          cityWeathers: cities,
          selectedCity: undefined,
          setSelectedCity: (value) => {},
        }}
      >
        <Main />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );

  const textsShouldBeFound = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Singapore",
    "Los Angeles",
    "Sydney",
    "Dubai",
    "Mist",
  ];

  const multipleTexts = ["Humidity", "Farenheit"];

  textsShouldBeFound.forEach((text) => {
    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
  });
  multipleTexts.forEach((text) => {
    const linkElement = screen.getAllByText(text);
    expect(linkElement).toHaveLength(8);
  });

  const image = getByAltText("Paris");
  expect(image.src).toContain(
    "http://cdn.weatherapi.com/weather/64x64/day/143.png"
  );
});
