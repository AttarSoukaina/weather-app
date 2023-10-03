export interface CityData {
  id?: string;
  country: string;
  name: string;
  lon: string;
  lat: string;
}

export interface Weather {
  temperature: number;
  feelTemperature: number;
  weatherIcon: string;
  windSpeed: number;
  mainWeather: string;
  pressure: number;
  visibility: number;
  humidity: number;
  tempMin: number;
  tempMax: number;
}