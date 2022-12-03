import axios from 'axios';
import queryString from 'query-string';
import { auth } from '../firebase/firebase-config';

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
  const token = await auth.currentUser.getIdToken();
  config.headers['Authorization'] = 'Bearer ' + token;
  
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
  throw error;
});

export default axiosPrivate;