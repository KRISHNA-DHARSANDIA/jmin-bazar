// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.57.153:7237/api/',
});

export default axiosInstance;
