import { AccessGetToken, Getinn, GetTypeFirma } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendInfFirm = async (NameFima, OGRN, Adress, VidDo) => {
    const token = await AccessGetToken();
    const inn = await Getinn();
    const type = await GetTypeFirma();
      const url = 'http://localhost:8765/enterprises/register-enterprise';
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ 
            "name": `${NameFima}`,
            "type": `ООО`,
            "inn": `${inn}`,
            "ogrn": `${OGRN}`,
            "address": `${Adress}`,
            "general_type_activity": `${VidDo}`
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
  
        const data = await response.json();
        await AsyncStorage.setItem("Ses_id", data.req_id)
        return true;
      } catch (error) {
        console.log(error.message)
        return false;
      }
    };
  