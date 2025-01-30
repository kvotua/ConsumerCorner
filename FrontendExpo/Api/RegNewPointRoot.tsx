import { apiRequest } from '../Api/RefreshToken';
import { AccessGetToken, GetIdFirma } from "@/app/AsyncStore/StoreTokens";

// Получение ID предприятия
export const GetIdEnterprise = async () => {
  const url = 'https://consumer-corner.kvotua.ru/enterprises/enterprises-info';
  const token = await AccessGetToken();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Проверка на успешность ответа
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Преобразование ответа в JSON
    const data = await response.json();
    console.log('Enterprise data:', data);  // Для отладки

    return data.id;
  } catch (error) {
    console.error("Error in GetIdEnterprise:", error.message);
    throw error; // Переброс ошибки, чтобы дальше её обрабатывали
  }
};

// Регистрация новой точки
export const RegNewPointServer = async (NamePoint, adress, StartTime, EndTime, Phone) => {
  const url = "https://consumer-corner.kvotua.ru/points/register"; // Указание правильного URL
  console.log(NamePoint, adress, StartTime, EndTime, Phone)
  try {
    const token = await AccessGetToken(); // Получение актуального токена
    const id = await GetIdFirma();  // Получение ID предприятия

    

    const payload = {
      title: NamePoint,
      enterprise_id: id,
      address: adress,
      opening_time: StartTime,  // Время открытия
      closing_time: EndTime,   // Время закрытия
      phone: Phone,            // Телефон
      type_activity: "Продажа", // Тип деятельности (можно изменить, если нужно)
    };
    console.log(payload)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log(response)
    // Проверка на успешность ответа
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Получение ответа и логирование для отладки
    const data = await response.json();
    console.log('Response data:', data);

    return true;
  } catch (error) {
    console.error("Error in RegNewPointServer:", error.message);
    return false; // Возвращаем false, если произошла ошибка
  }
};
