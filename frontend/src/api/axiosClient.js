import axios from 'axios';
import queryString from 'query-string';
import { updateToken } from '../features/Authentication/userSlice';
import store from '../app/store'
import jwt_decode from "jwt-decode"

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
  let currentDate = new Date();
  const decodedToken = (localStorage.getItem('authTokens') ? jwt_decode((JSON.parse(localStorage.getItem('authTokens'))).access) : null)
  const authTokens = (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

  if (decodedToken == null) return config;
  
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Expired")
    await store.dispatch(updateToken({refresh: authTokens.refresh}))
    config.headers["Authorization"] = `Bearer ${store.getState().userData.authTokens.access}`;
  }

  else {
    config.headers["Authorization"] = `Bearer ${authTokens.access}`;
  }
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