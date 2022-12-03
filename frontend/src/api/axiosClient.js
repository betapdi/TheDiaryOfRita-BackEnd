import axios from 'axios';
import jwt_decode from "jwt-decode";
import queryString from 'query-string';
import store from '../app/store';
import { updateToken } from '../features/Authentication/userSlice';

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
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosClient;