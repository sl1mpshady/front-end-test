interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Weather {
  last_updated: string;
  temp_c: float;
  temp_f: float;
  is_day: boolean;
  condition: Condition;
  humidity: number;
}

interface CityWeather {
  city: string;
  weather: Weather;
  forecasts?: CityWeather[];
}

interface ForecastReponseDay {
  avgtemp_c: number;
  avgtemp_f: number;
  avghumidity: number;
  condition: Condition;
}

interface ForecastReponse {
  date: string;
  day: ForecastReponseDay;
}
