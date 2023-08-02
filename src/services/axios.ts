import axios from "axios";
import { getStoredUser } from "../utils/user-storage";

export default axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://makhzan.mouhandalkadri.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedAxios = axios.create({
  // baseURL: "http://localhost:3000",
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
