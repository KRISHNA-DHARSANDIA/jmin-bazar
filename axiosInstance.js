// axiosInstance.js
import axios from 'axios';

//TODO : change to process.env.__
const axiosInstance = axios.create({
  baseURL: 'http://192.168.179.153:7237/api/',
});

export default axiosInstance;
