// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.17.153:7237/api/',
});

export default axiosInstance;
