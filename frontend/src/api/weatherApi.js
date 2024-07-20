import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getWeatherData = async (location) => {
  const url = `${backendUrl}/weather/get-data?location=${location}`;
  const result = await axios.get(url);
  
  return result;
};

export {
  getWeatherData
};