import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
api.interceptors.request.use((config) => {
  console.log("Request Config:", config.data);
  return config;
}, (error) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  console.log("Response Data:", response.data);
  return response;
}, (error) => {
  console.error("Response Error:", error);
  return Promise.reject(error);
});
export const apiFile = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "blob",
});
