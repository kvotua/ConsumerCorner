import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendNumber = async (token) => {

    const url = 'http://localhost:8765/auth/send';
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "access-token" : token,
          "token-type" : "Baerer"
        },
        body: JSON.stringify({ 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка сервера");
      }

      const data = await response.json();
      await AsyncStorage.setItem("Ses_id", data.req_id)
    } catch (error) {
      console.log(error.message)
    }
  };

  
 export const handleNext = async (phone : string, password : string) => {

    const url = 'http://localhost:8765/login';
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          phone: phone,          
          password: password   
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message)
    }
  };