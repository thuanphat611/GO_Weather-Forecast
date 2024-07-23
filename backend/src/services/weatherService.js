const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

const getData = async function(location) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${apiKey}`; 

  try {
    const response = await axios.get(url)
    const data = response.data;
    const currentWeatherData = data.data[0];

    const result = {
      success: true,
      name: data.city_name,
      current: {
        date: currentWeatherData.datetime,
        icon: 'https://cdn.weatherbit.io/static/img/icons/' + currentWeatherData.weather.icon + '.png',
        condition: currentWeatherData.weather.description,
        temp: currentWeatherData.temp,
        wind: currentWeatherData.wind_spd,
        humid: currentWeatherData.rh
      },
      nextDays: data.data
      .filter((data, index) => index > 0) //first item is current date, only take the rest
      .map((data) => ({
        date: data.datetime,
        icon: 'https://cdn.weatherbit.io/static/img/icons/' + currentWeatherData.weather.icon + '.png',
        condition: data.weather.description,
        temp: data.temp,
        wind: data.wind_spd,
        humid: data.rh
      }))
    }

    return result;
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      success: false,
      message: err.response.data.error.message
    };
  }
}

module.exports = {
  getData,
};