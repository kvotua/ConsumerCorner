import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { apiRequest } from "../../../Api/RefreshToken"; // Убедитесь, что функция apiRequest корректно импортирована
import Toast from "../Notif/toasts/Toast";
export default function Points({ navigation }) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const url = "http://localhost:8765/"; // Эндпоинт для получения точек
        const response = await apiRequest(url, "GET", {}, {});
        setPoints(response);
      } catch (error) {
        console.error("Ошибка при загрузке точек:", error.message);
        // Здесь можно вызвать showToast для уведомления пользователя
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  const registerPoint = async (pointData) => {
    try {
      const url = "http://localhost:8765/register";
      const response = await apiRequest(url, "POST", pointData, {});
      showToast("success", "Успешно!", "Точка успешно добавлена");
    } catch (error) {
      console.error("Ошибка при добавлении точки:", error.message);
      showToast("error", "Ошибка!", error.message || "Произошла ошибка при добавлении точки");
    }
  };

  const deletePoint = async (pointId) => {
    try {
      const url = `http://localhost:8765/delete/${pointId}`;
      const response = await apiRequest(url, "DELETE", {}, {});
      showToast("success", "Успешно!", `Точка ${pointId} успешно удалена`);
    } catch (error) {
      console.error("Ошибка при удалении точки:", error.message);
      showToast("error", "Ошибка!", error.message || "Произошла ошибка при удалении точки");
    }
  };
  
  

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
                  {/* Компонент Toast */}
            {toast.visible && (
          <Toast
              type={toast.type}
              message={toast.message}
              subMessage={toast.subMessage}
              visible={toast.visible}
              onDismiss={() => setToast({ ...toast, visible: false })} // Здесь важно передать функцию
          />
          )}
        <View style={styles.firmsAndPointsHeader}>
          <Text style={styles.menuTitle}>Мои точки</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
        <FlatList
          style={[{ paddingRight: 10 }]}
          data={points}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemFlatList}>
              <Text style={styles.textInFlatList}>{item.address}</Text>
              <View style={styles.circleContainer}></View>
            </View>
          )}
          indicatorStyle="white"
        />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={registerPoint}>
            <Text style={styles.textInButtonsMenuPage}>Добавить точку</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
