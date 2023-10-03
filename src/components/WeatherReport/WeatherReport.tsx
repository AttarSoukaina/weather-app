import React, {useState, useEffect} from 'react';
import './WeatherReport.scss';
import { CityData, Weather } from '../../types';
import { getWeather } from './WeatherReport';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export const WeatherReport: React.FC<CityData> = ({name, country, lon, lat}) => {
  const weatherInfosLabels = {
    humidity: { unit: "%", title: "Humidity"},
    visibility: { unit: "m", title: "Visibility"},
    tempMin: { unit: "°C", title: "Temp Min"},
    windSpeed: { unit: "m/s", title: "Wind"},
    pressure: {unit: "hPa", title: "Pressure"},
    tempMax: { unit: "°C", title: "Temp Max"}
  }

  const [weatherData, setWeatherData] = useState<Weather>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWeather(lon, lat); 
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, [lat, lon]);

  interface FieldProps {
    title: string;
    value: number;
    unit: string;
  }

  const Field:React.FC<FieldProps> = ({ title, value, unit}) => {
    return (
      <Grid item xs={4} className="field" justifyContent="center" direction="column">
        <Typography variant="body1" component="div" className="field-title">
          {title}
        </Typography>
        <Typography variant="body2" component="div" className="field-number">
          <strong>{value}</strong>
          <sup className="field-unit">{unit}</sup>
        </Typography>
      </Grid>
    );
  };

  return (
    <div>
    {weatherData ? 
    <div className="weather-report"> 
      <h4 className="city-details">
        {name + ', ' + country} Weather
      </h4>
      <div className="weather-highlight">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
            alt={weatherData?.mainWeather}
          />
        </div>
        <div className="temperature">
          {Math.round(weatherData.temperature)}&deg;C
          <p>
            Feels like {Math.round(weatherData.feelTemperature)}&deg;C
          </p>
          <p>
            {weatherData.mainWeather}
          </p>
        </div>
      </div>
      
      <div className="field-grid-container">
        <Grid container spacing={2} justifyContent="center">
          {Object.entries(weatherInfosLabels).map(([key, element]) => (
            <Field title={element.title} value={weatherData[key]} unit={element.unit}/>
          )
          )}
        </Grid>
      </div>
      <div className='date'>
        <p>
          {new Date().toLocaleString()}
        </p>
      </div>
      
      
    </div>
    : null }
    </div>
  );
};

export default WeatherReport;