import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type GlobalState = {
  cityWeathers: CityWeather[];
  selectedCity?: CityWeather | undefined;
  setSelectedCity: Dispatch<SetStateAction<CityWeather | undefined>>;
};

export const GlobalContext = createContext<GlobalState>({
  cityWeathers: [],
  selectedCity: undefined,
  setSelectedCity: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
