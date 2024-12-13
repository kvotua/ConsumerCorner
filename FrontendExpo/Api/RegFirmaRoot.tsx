import { AccessGetToken, Getinn, GetTypeFirma } from "@/app/AsyncStore/StoreTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiRequest } from '../Api/RefreshToken';

export const SendInfFirm = async (NameFima, OGRN, Adress, VidDo) => {
  const url = 'http://localhost:8765/enterprises/register-enterprise';
  try {
    const data = await apiRequest(url, "POST", {
      name: NameFima,
      type: "ООО",
      inn: await Getinn(),
      ogrn: OGRN,
      address: Adress,
      general_type_activity: VidDo,
    });
    await AsyncStorage.setItem("Ses_id", data.req_id);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
