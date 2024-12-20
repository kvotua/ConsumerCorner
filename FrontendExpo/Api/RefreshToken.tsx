import { AccessGetToken, RefreshGetToken } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const refreshToken = async () => {
  const url = 'http://localhost:8765/refresh';
  const refreshToken = await RefreshGetToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Refresh-Token": refreshToken, // Ваш заголовок для обновления
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("refresh_token", data.refresh_token);
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    throw error; // Можно добавить логику для выхода пользователя
  }
};

export const apiRequest = async (url, method, body, headers = {}) => {
  let token = await AccessGetToken();

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      // Если токен истек, обновляем его и повторяем запрос
      token = await refreshToken();
      const retryResponse = await fetch(url, {
        method,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(errorData.message || "Server error after token refresh");
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Server error");
    }

    return response.json();
  } catch (error) {
    console.error("API request error:", error.message);
    throw error;
  }
};
