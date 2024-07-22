import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getWeatherData = async (location) => {
  const url = `${backendUrl}/weather/get-data?location=${location}`;
  console.log(url);
  const result = await axios.get(url);
  
  return result;
};

const postRegisterEmail = async (email) => {
  const url = `${backendUrl}/subscription/register`;

  try {
    const response = await axios.post(url, { email });
    
    return {success: true, message: response?.data?.message};
  } catch (err) {
    return {success: false, message: err.response?.data?.message || 'Some error occured'};
  }
}

const postUnsubscribeEmail = async (email) => {
  const url = `${backendUrl}/subscription/unsubscribe`;

  try {
    const response = await axios.post(url, { email });

    return {success: true, message: response?.data?.message};
  } catch (err) {
    return {success: false, message: err.response?.data?.message || 'Some error occured'};
  }
}

const postRegisterVerification = async (token) => {
  const url = `${backendUrl}/subscription/register-verification`;

  try {
    const response = await axios.post(url, { token });
    
    return {success: true, message: response?.data?.message};
  } catch (err) {
    return {success: false, message: err.response?.data?.message || 'Some error occured'};
  }
}

const postUnsubscribeVerification = async (token) => {
  const url = `${backendUrl}/subscription/unsubscribe-verification`;

  try {
    const response = await axios.post(url, { token });

    return {success: true, message: response?.data?.message};
  } catch (err) {
    return {success: false, message: err.response?.data?.message || 'Some error occured'};
  }
}

export {
  getWeatherData,
  postRegisterEmail,
  postUnsubscribeEmail,
  postRegisterVerification,
  postUnsubscribeVerification
};