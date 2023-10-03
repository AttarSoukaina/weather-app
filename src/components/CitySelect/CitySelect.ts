import axios from 'axios';
import { CityData } from '../../types';

export const fetchCitiesSuggestions = async (inputValue: string): Promise<CityData[]>  => {
    const GET_CITIES_BASE_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000';
    try {
      const response = await axios.get(
        `${GET_CITIES_BASE_URL}/records?select=geoname_id,name,coordinates,country_code&where=suggest(name,"${inputValue}")&limit=10`
      );
  
      return response.data.results.map(
        (result: any) => ({
          id: result.geoname_id,
          name: result.name,
          country: result.country_code,
          lon: result.coordinates.lon,
          lat: result.coordinates.lat,
        })
      );
    } catch (error) {
        throw error;
    }
  };