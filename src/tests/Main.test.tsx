import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext, GlobalContext } from "../context";
import Main from "../Main";

import { user } from "./mocks";

// const renderMain = ({
//   user,
//   setUser,
//   cityWeathers,
//   selectedCity,
//   setSelectedCity,
// }: {
//   user?: ReactFacebookLoginInfo;
//   setUser?: React.Dispatch<
//     React.SetStateAction<ReactFacebookLoginInfo | undefined>
//   >;
//   cityWeathers?: CityWeather[] | [];
//   selectedCity?: CityWeather | undefined;
//   setSelectedCity?: React.Dispatch<
//     React.SetStateAction<CityWeather | ((value) => {})>
//   >;
// }) =>
//   render(
//     <AuthContext.Provider value={{ user: user, setUser: setUser }}>
//       <GlobalContext.Provider
//         value={{
//           cityWeathers: cityWeathers,
//           selectedCity: selectedCity,
//           setSelectedCity: selectedCity,
//         }}
//       >
//         {/* <Main test={true} /> */}
//       </GlobalContext.Provider>
//     </AuthContext.Provider>
//   );

test("renders login by default", () => {
  render(
    <AuthContext.Provider value={{ user: undefined, setUser: (value) => {} }}>
      <GlobalContext.Provider
        value={{
          cityWeathers: [],
          selectedCity: undefined,
          setSelectedCity: (value) => {},
        }}
      >
        <Main test={true} />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );

  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders home if user is set", () => {
  const { getByAltText } = render(
    <AuthContext.Provider
      value={{
        user,
        setUser: (value) => {},
      }}
    >
      <GlobalContext.Provider
        value={{
          cityWeathers: [],
          selectedCity: undefined,
          setSelectedCity: (value) => {},
        }}
      >
        <Main test={true} />
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );

  const textsShouldBeFound = ["Hello,", user.name];
  textsShouldBeFound.forEach((text) => {
    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
  });

  const image = getByAltText(user.name);
  expect(image.src).toContain(user.picture.data.url);
});
