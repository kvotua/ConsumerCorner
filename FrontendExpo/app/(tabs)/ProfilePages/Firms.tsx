import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { apiRequest } from "@/Api/RefreshToken";
import Toast from "../Notif/toasts/Toast";
import { getEnterprisesInfo, registerEnterprise } from '../../../Api/registerEnterprise';

export default function Firms({ navigation }) {
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

    // Функция для загрузки данных с сервера
    const fetchFirms = async () => {
      try {
        setLoading(true);
        const data = await getEnterprisesInfo();
        setFirms(data);
      } catch (error) {
        console.error("Ошибка при загрузке компаний:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFirms(); // Загружаем данные при монтировании компонента
    }, []);

  // Массив с данными, добавлены типы для фирмы и точки
  const data = [
    { id: '1', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '2', title: "Название ИП, ИНН", type: 'firm', points: [
      'Точка: Москва, ул. Тверская д. 4'
    ] },
    { id: '3', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '4', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '5', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '6', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '7', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '8', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '9', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '10', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '11', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    
  ];

  const handleRegisterFirm = async () => {
    try {
      // Пример данных, которые можно собрать из формы или модального окна
      const firmData = {
        name: "Название ООО",
        inn: "1234567890",
        ogrn: "1234567890123",
        address: "Калининград, ул. Ленина д. 16",
        typeActivity: "Продажа",
      };

      const response = await registerEnterprise(
        firmData.name,
        firmData.inn,
        firmData.ogrn,
        firmData.address,
        firmData.typeActivity
      );

      showToast("success", "Успех!", "Компания успешно зарегистрирована.");
      console.log("Ответ сервера:", response);

      // Возможно, потребуется обновить данные списка
      navigation.replace("Firms"); // Перезагрузка текущего экрана
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Не удалось зарегистрировать компанию.");
    }
  };

  // Функция рендеринга каждого элемента
  const renderItem = ({ item }) => {
    if (item.type === 'firm') {
      // Если элемент - фирма, то отображаем название фирмы и при клике переходим на экран с точками
      return (
          <View style={styles.itemFlatList}>
          <Text style={styles.textInFlatList}>{item.name}, ИНН: {item.inn}</Text>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={() => navigation.navigate("Points", { firmId: item.id, points: item.points })}
          />
        </View>
      );
    } else {
      // Если элемент - точка, то просто отображаем точку
      return (
        <View style={localStyles.flatListContainer}>
          <View style={styles.itemFlatList}>
            <Text style={styles.textInFlatList}>{item.title}</Text>
            <View style={styles.circleContainer}>
              <View style={styles.innerCircle} />
            </View>
        </View>
        </View>
      );
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
          <Text style={styles.menuTitle}>Мои фирмы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine}/>
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
          <FlatList style={[{ paddingRight: 10 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет фирм/точек</Text>}
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={handleRegisterFirm}>
            <Text style={styles.textInButtonsMenuPage}>Добавить фирму</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    alignItems: 'center',
  }
});

