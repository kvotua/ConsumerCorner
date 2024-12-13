import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiRequest } from '../Api/RefreshToken';

export const SendNumber = async (token) => {
  const url = 'http://localhost:8765/auth/send';
  try {
    const data = await apiRequest(url, "POST", {}, { Authorization: `Bearer ${token}` });
    await AsyncStorage.setItem("Ses_id", data.req_id);
  } catch (error) {
    console.error(error.message);
  }
};

export const handleNext = async (phone, password) => {
  const url = 'http://localhost:8765/login';
  try {
    return await apiRequest(url, "POST", { phone, password });
  } catch (error) {
    console.error(error.message);
  }
};
