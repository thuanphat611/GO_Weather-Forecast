const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

const getData = async function(location) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=9&aqi=yes&q=${location}`; 

  try {
    const response = await axios.get(url)
    const data = response.data;
    const result = {
      success: true,
      name: data.location.name,
      current: {
        date: data.location.localtime.split(' ')[0],
        icon: data.current.condition.icon,
        condition: data.current.condition.text,
        temp: data.current.temp_c,
        wind: data.current.wind_mph,
        humid: data.current.humidity
      },
      nextDays: data.forecast.forecastday
      .filter((data, index) => index > 0) //first item is current date, only take the rest
      .map((data) => ({
        date: data.date,
        icon: data.day.condition.icon,
        condition: data.day.condition.text,
        temp: data.day.avgtemp_c,
        wind: data.day.maxwind_mph,
        humid: data.day.avghumidity
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