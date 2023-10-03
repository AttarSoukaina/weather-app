import React, {useState} from 'react';
import { CitySelect } from '../../components/CitySelect/CitySelect.tsx';
import { WeatherReport } from '../../components/WeatherReport/WeatherReport.tsx';
import { CityData } from '../../types';

export const WeatherChecker = () => {
  
  const [selectedCity, setSelectCity] = useState<CityData|null>();
  return (
    <div className='weather-checker'>
      <h1 className='weather-checker-title'>What's the weather like today?</h1>
      <CitySelect setCurrentCity={setSelectCity}/>
      {selectedCity && <WeatherReport name={selectedCity.name} country={selectedCity.country} lat={selectedCity.lat} lon={selectedCity.lon}/>}
    </div>
  );
}