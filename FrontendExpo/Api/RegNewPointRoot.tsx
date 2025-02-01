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
export const RegNewPointServer = async (NamePoint, adress, StartTime, EndTime, Phone, e_id, navigation, showToast) => {
  const url = "https://consumer-corner.kvotua.ru/points/register"; // Указание правильного URL
  
  if (!NamePoint || !adress || !StartTime || !EndTime || !Phone) {
    showToast("error", "Ошибка!", "Вы заполнили не все поля!")
    return;
  }

  if (NamePoint.length <= 0 || adress.length <= 0 || StartTime.length <= 0 || EndTime.length <= 0 || Phone.length <= 0) {
    showToast("error", "Ошибка!", "Вы заполнили не все поля!")
    return;
  }
  const phoneRegex = /^79\d{9}$/;
  if (!phoneRegex.test(Phone)) {
    showToast("error", "Ошибка!", "Номер телефона должен начинаться с +79 и состоять из 11 цифр!");
    return;
  }
  try {
    const token = await AccessGetToken(); // Получение актуального токена
    const payload = {
      title: NamePoint,
      enterprise_id: e_id,
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
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error(`Server error: ${response.status} - ${JSON.stringify(errorData)}`);
    }
    

    // Получение ответа и логирование для отладки
    const data = await response.json();
    console.log('Response data:', data);
    if (data['status_code'] == 200) {
      navigation.replace('MenuPage')
    }
    return true;
  } catch (error) {
    console.error("Error in RegNewPointServer:", error.message);
    return false; // Возвращаем false, если произошла ошибка
  }
};
