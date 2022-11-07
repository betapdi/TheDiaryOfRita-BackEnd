import axios from 'axios';
import queryString from 'query-string';

const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
  },
});

axiosPrivate.interceptors.request.use(async (config) => {
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosPrivate.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  console.log(error)
  throw error;
});

export default axiosPrivate;