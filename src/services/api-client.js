import axios from "axios";
import { AUTH_TOKEN } from "../constants";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async config => {
    const token = await window.localStorage.getItem(AUTH_TOKEN);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function client(endpoint, { method = "get", data, options } = {}) {
  return axios[method](endpoint, data, options)
}

export default client;