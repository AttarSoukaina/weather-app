import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {fetchCitiesSuggestions} from './CitySelect';

import './CitySelect.scss';
import { CityData } from '../../types';

interface Props {
  setCurrentCity: (city: CityData|null) => void;
}

export const CitySelect: React.FC<Props> = ({setCurrentCity}) => {
  const [value, setValue] = useState<CityData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CityData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCitiesSuggestions(inputValue); 
        setOptions(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, [inputValue]);

  const onInputChange = (
    _event: React.ChangeEvent<{}>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  
  return (
    <Autocomplete
      className='city-select'
      handleHomeEndKeys
      autoSelect
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
        setCurrentCity(newValue);
      }}
      inputValue={inputValue}
      onInputChange={onInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Select a City" />}
      renderOption={(props, option) => (
        <div className='city-option' {...props} key={option.id}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
            alt=""
          />
          <p>{option.name}, {option.country}</p>
        </div>
      )}
    />
  );
};