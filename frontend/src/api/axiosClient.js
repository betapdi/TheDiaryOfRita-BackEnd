import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;