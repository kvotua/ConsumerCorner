import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const apiFile = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "blob",
});
