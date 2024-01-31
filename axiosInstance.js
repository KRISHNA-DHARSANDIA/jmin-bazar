// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.229.153:7237/api/',
});

export default axiosInstance;
