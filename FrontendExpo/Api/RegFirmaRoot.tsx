import { AccessGetToken, Getinn } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendInfFirm = async (NameFima, OGRN, Adress, VidDo, showToast) => {
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
    const responseData = await response.json();
    if (responseData.detail && (responseData.detail.message || responseData.detail.phone)) {

      await AsyncStorage.setItem('IdFirm', responseData.detail.enterprise_id.toString());
      return responseData.detail.enterprise_id;
    } else {
      const errorMessages: { [key: string]: string } = {
        "Error when registering a company": "Ошибка при регистрации компании",
      };

      // Получаем текст ошибки на русском
      const text = errorMessages[responseData.detail as keyof typeof errorMessages] || responseData.detail || "Неизвестная ошибка";
      showToast("error", "Ошибка!", text);
    }
  } catch (error) {
    console.error("Ошибка SendInfFirm:", error.message);
    return false;
  }
};
