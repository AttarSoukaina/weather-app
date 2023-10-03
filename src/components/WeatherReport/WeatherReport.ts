import axios from 'axios';
import { Weather } from '../../types';

const API_KEY = '5956262f29b0a2ac0ae4eaeaffd36cbc';
const API_BASE_URL = `https://api.openweathermap.org/data/2.5`;

export const getWeather = async (lon: string, lat: string): Promise<Weather> => {
  try {
    const {data} = await axios.get(`${API_BASE_URL}/weather?appid=${API_KEY}&lon=${lon}&lat=${lat}&units=metric`);
    return {
        temperature: data.main.temp,
        feelTemperature: data.main.feels_like,
        weatherIcon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        mainWeather: data.weather[0].main,
        pressure: data.main.pressure,
        visibility: data.visibility,
        humidity: data.main.humidity,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
    };
  } catch (error) {
    throw error;
  }
}