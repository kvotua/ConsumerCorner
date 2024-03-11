import axios from "axios"

export const axiosBase = axios.create({
  baseURL: "http://192.168.0.5:8000/",
})
