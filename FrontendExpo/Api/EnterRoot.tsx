import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiRequest } from '../Api/RefreshToken';
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

export const SendNumber = async (token) => {
  const url = 'https://consumer-corner.kvotua.ru/auth/send';
  try {
    const data = await apiRequest(url, "POST", {}, { Authorization: `Bearer ${token}` });
    await AsyncStorage.setItem("Ses_id", data.req_id);
  } catch (error) {
    console.error(error.message);
  }
};

export const handleNext = async (phone, password) => {
  let token = await AccessGetToken();
  const url = 'https://consumer-corner.kvotua.ru/login';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({phone, password})
    });
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};
