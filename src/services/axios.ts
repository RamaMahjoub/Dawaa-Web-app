import axios from "axios";
import { getStoredUser } from "../utils/user-storage";

import { setSessionExpired } from "../redux/authSlice";

export default axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://makhzan.mouhandalkadri.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedAxios = axios.create({
  baseURL: "https://makhzan.mouhandalkadri.com",
  headers: {
    "Content-Type": "application/json",
  },
});

protectedAxios.interceptors.request.use((config) => {
  let tokensData = getStoredUser();
  config.headers = config.headers || {};
  config.headers.Authorization = `bearer ${tokensData?.accessToken}`;
  return config;
});

protectedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const { store } = require("../redux/store");
      store.dispatch(setSessionExpired());
    }
    return Promise.reject(error);
  }
);
