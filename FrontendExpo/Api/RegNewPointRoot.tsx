import { apiRequest } from '../Api/RefreshToken';
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

// Получение ID предприятия
export const GetIdEnterprise = async () => {
  const url = 'https://consumer-corner.kvotua.ru/enterprises/enterprises-info';
  try {
    const data = await apiRequest(url, "POST", {});
    return data.id;
  } catch (error) {
    console.error("Error in GetIdEnterprise:", error.message);
    throw error;
  }
};

// Регистрация новой точки
export const RegNewPointServer = async (NamePoint, adress, StartTime, EndTime, Phone) => {
  const url = "https://consumer-corner.kvotua.ru/points/register"; // Укажите корректный URL
  try {
    const token = await AccessGetToken();
    const id = await GetIdEnterprise(); // ID предприятия автоматически запрашивается с обновлением токена, если нужно

    const response = await apiRequest(
      url,
      "POST",
      {
        name: NamePoint,
        enterprise_id: id,
        address: adress,
        opening_time: StartTime,
        closing_time: EndTime,
        phone: Phone,
        type_activity: "Продажа", // Заменить, если нужно
      }
    );

    return true;
  } catch (error) {
    console.error("Error in RegNewPointServer:", error.message);
    return false;
  }
};
