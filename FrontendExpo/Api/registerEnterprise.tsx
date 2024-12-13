import { apiRequest } from "../Api/RefreshToken"; // Импорт универсальной функции

export const registerEnterprise = async (name, inn, ogrn, address, typeActivity) => {
  const url = "http://localhost:8765/register-enterprise";

  try {
    const response = await apiRequest(
      url,
      "POST",
      {
        name: name,
        inn: inn,
        ogrn: ogrn,
        address: address,
        general_type_activity: typeActivity,
      },
      { "Content-Type": "application/json" }
    );

    return response;
  } catch (error) {
    console.error("Ошибка при регистрации фирмы:", error.message);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
};

export const getEnterprisesInfo = async () => {
  const url = "http://localhost:8765/enterprises-info";

  try {
    const response = await apiRequest(url, "GET", {}, {});
    return response;
  } catch (error) {
    console.error("Ошибка при получении списка компаний:", error.message);
    throw error;
  }
};