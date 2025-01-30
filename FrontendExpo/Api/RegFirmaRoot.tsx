import { AccessGetToken, Getinn } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendInfFirm = async (NameFima, OGRN, Adress, VidDo) => {
  const url = 'https://consumer-corner.kvotua.ru/enterprises/register';
  const jwt = await AccessGetToken();
  
  const payload = {
    name: NameFima,
    type: "ООО",
    inn: await Getinn(),
    ogrn: OGRN,
    address: Adress,
    general_type_activity: VidDo,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    // Проверяем текст ответа от сервера
    const responseData = await response.json();
    console.log(responseData)
    console.log("Parsed server response:", responseData.detail.enterprise_id);

    await AsyncStorage.setItem('IdFirm', responseData.detail.enterprise_id);
    return true;
  } catch (error) {
    console.error("Ошибка SendInfFirm:", error.message);
    return false;
  }
};
