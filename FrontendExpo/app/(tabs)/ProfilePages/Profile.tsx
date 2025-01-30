import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  FlatList
} from "react-native";
import Style from "@/app/Styles/Style";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import Icons from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const getPaddingVertical = () => {
    if (Platform.OS === 'ios') return isTablet ? 192 : -25; 
    else if (Platform.OS === 'android') return isTablet ? 192 : 25; 
    return 0; 
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Очищаем асинхронное хранилище
      navigation.replace("Start"); // Перенаправляем на страницу Start
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };

  // Функция для получения данных профиля
  const fetchUserProfile = async () => {
    try {
      const token = await AccessGetToken();
      const response = await fetch('https://consumer-corner.kvotua.ru/profile/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setUserData({
        name: data.fio,
        phone: data.phone,
        email: data.email
      });
      setIsEnabled(data.verify_phone); // Устанавливаем состояние переключателя
    } catch (error) {
      console.error('Ошибка при получении данных профиля:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Вызываем функцию при загрузке компонента
  }, []);

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      receive_telegram: isEnabled, // Обновляем состояние switch
    };

    try {
      const token = await AccessGetToken();
      const response = await fetch('https://consumer-corner.kvotua.ru/profile/change', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert("Вы успешно обновили данные!");
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  // Данные для FlatList
  const inputData = [
    { id: '1', label: 'Ф.И.О', placeholder: 'Введите Ф.И.О', value: userData.name || '', isSwitch: false, key: 'name' },
    { id: '2', label: 'Номер телефона', placeholder: 'Введите номер телефона', value: userData.phone || '', isSwitch: false, key: 'phone', editable: false },
    { id: '3', label: 'Email', placeholder: 'Введите email', value: userData.email || '', isSwitch: false, key: 'email' },
    { id: '5', label: 'Получать отзывы в Telegram', isSwitch: true },
  ];
  
  const renderInputItem = ({ item }) => (
    <View style={{ marginBottom: 18, flexDirection: item.isSwitch ? 'row' : 'column', alignItems: item.isSwitch ? 'center' : 'flex-start' }}>
      <Text style={Style.textDescriptionProfile}>{item.label}</Text>
      {item.isSwitch ? (
        <Switch 
          style={[{ transform: isTablet ? [{ scale: 1 }] : [{ scale: 1 }] }, { marginStart: "auto" }]} 
          onValueChange={toggleSwitch}
          value={isEnabled}
          trackColor={{ false: "#7B9DF2", true: "#7B9DF2" }}
          thumbColor={isEnabled ? "#E6E6E6" : "#E6E6E6"}
        />
      ) : (
        <TextInput 
          style={[Style.textInputProfile, item.editable === false && localStyles.disabledInput]} 
          placeholder={item.placeholder} 
          value={item.value} 
          editable={item.editable !== false} 
          onChangeText={(text) => setUserData({ ...userData, [item.key]: text })}
        />
      )}
    </View>
  );



  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
        <SafeAreaView style={[Style.containerMainPage]}>
          <View style={Style.menuPagesFooterHeader}>
              <Text style={Style.footerDocumentsText}>уголок потребителя</Text>
              </View>
              <View style={[Style.containerLine]}>
                <View style={Style.menuPagesLine} />
              </View>
        <View style={[Style.profileHeader, {flexDirection: 'row', justifyContent: "center"}]}>
          <Image
            source={require("../../../assets/images/profileImage.png")}
            style={localStyles.profileImage} 
          />
          <TouchableOpacity onPress={() => handleLogout()} style={{justifyContent: "center", marginRight: 50}}>
            <Icon name='exit-to-app' size={32} color={'white'}/>
          </TouchableOpacity>
        </View>
        
        <View style={Style.containerProfile}>
          <FlatList
            data={inputData}
            renderItem={renderInputItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={Style.containerButtonsMenuPages}>
          <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={Style.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80, 
    borderRadius: 50,
    marginTop: 12,
    borderWidth: 1, 
    borderColor: "#FFFFFF", 
  },
  containerButtonsBottomFlatList: {
    width: "100%",
    height: 45,  
    justifyContent: 'flex-end', 
  },
  disabledInput: {
    backgroundColor: "#E0E0E0", // Светло-серый фон
    color: "#A0A0A0", // Серый текст
    borderColor: "#C0C0C0", // Серый бордер
  },
});
