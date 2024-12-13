import React, { useEffect, useState } from "react";
import { 
  ImageBackground, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Switch, 
  StyleSheet, 
  Image 
} from "react-native";
import Style from "@/app/Styles/Style";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "../Notif/toasts/Toast";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const fetchUserData = async () => {
    try {
      const token = await AccessGetToken()
      const response = await fetch('http://localhost:8000/me', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`, // Подставь токен здесь
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data); // Записываем полученные данные пользователя
      setIsEnabled(data.receive_telegram); // Устанавливаем состояние switch
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Загружаем данные пользователя при монтировании
  }, []);

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      receive_telegram: isEnabled, // Обновляем состояние switch
    };

    try {
      const token = await AccessGetToken()
      const response = await fetch('http://localhost:8000/change', {
        method: 'PATCH',
        headers: {
          'Authorization': `${token}`, // Подставь токен здесь
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      showToast("success", "Успех!", error.message || "Вы успешно обновили данные!");
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
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
        <View style={Style.profileHeader}>
          <Image source={require("../../../assets/images/profileImage.png")} style={localStyles.profileImage} />
          <Text style={Style.profileTitle}>{userData.name || 'Акулич В.C'}</Text>
        </View>
        <View style={Style.containerProfile}>
          <Text style={Style.textDescriptionProfile}>Ф.И.О</Text>
          <TextInput 
            style={Style.textInputProfile} 
            placeholder="Акулич Виктор Сергеевич" 
            value={userData.name} 
            onChangeText={(text) => setUserData({ ...userData, name: text })} 
          />
          
          <Text style={[Style.textDescriptionProfile, { marginTop: 18 }]}>Номер телефона</Text>
          <TextInput 
            style={Style.textInputProfile} 
            placeholder="+79113453221" 
            value={userData.phone} 
            onChangeText={(text) => setUserData({ ...userData, phone: text })} 
          />

          <Text style={[Style.textDescriptionProfile, { marginTop: 18 }]}>Email</Text>
          <TextInput 
            style={Style.textInputProfile} 
            placeholder="yyyy@mail.ru" 
            value={userData.email} 
            onChangeText={(text) => setUserData({ ...userData, email: text })} 
          />

          <Text style={[Style.textDescriptionProfile, { marginTop: 18 }]}>Изменить пароль</Text>
          <TextInput style={Style.textInputProfile} placeholder="************" secureTextEntry />
        </View>

        <View style={Style.switchContainer}>
          <Text style={Style.switchText}>Получать отзывы в Telegram</Text>
          <Switch 
            style={{ transform: [{ scale: 1 }] }}
            onValueChange={toggleSwitch}
            value={isEnabled}
            trackColor={{ false: "#7B9DF2", true: "#7B9DF2" }}
            thumbColor={isEnabled ? "#E6E6E6" : "#E6E6E6"}
          />
        </View>

        <View style={[Style.containerButtonsMenuPages, { paddingVertical: 0 }]}>
          <TouchableOpacity style={Style.buttonMenuPage} onPress={handleUpdateProfile}>
            <Text style={Style.textInButtonsMenuPage}>Обновить профиль</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.buttonMenuPage} onPress={() => navigation.replace("MenuPage")}>
            <Text style={Style.textInButtonsMenuPage}>Вернуться на главную</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100, 
    borderRadius: 50,
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: "#FFFFFF", 
  },
});
