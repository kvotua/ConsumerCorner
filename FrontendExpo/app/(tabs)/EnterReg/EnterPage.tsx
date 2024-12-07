import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Toast from "../Notif/toasts/Toast";

export default function Enter({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [phoneValue, setPhoneValue] = useState(""); // Значение для отображения с маской
  const [rawPhoneValue, setRawPhoneValue] = useState(""); // Очищенное значение для передачи
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  const handleInputChange = (text) => {
    // Устанавливаем значение с маской для отображения
    setPhoneValue(text);

    // Извлекаем только цифры из введенного значения
    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
  };

  
  const handleNext = async () => {

    const url = 'http://127.0.0.1:8000/auth/login';
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          phone: `${rawPhoneValue}`,          
          password: password   
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Неверный логин или пароль");
      }

      const data = await response.json();
      navigation.replace("MenuPage")
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
    }
  };

  const handleFocus = () => {
    // Устанавливаем маску при первом фокусе
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
                  {toast.visible && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    subMessage={toast.subMessage}
                    visible={toast.visible}
                    onDismiss={() => setToast({ ...toast, visible: false })} // Здесь важно передать функцию
                />
                )}
            <View style={[Style.menuHeader, {alignItems: "center",}]}>
              <Text style={StyleSheet.flatten([Style.titleHead])}>Вход</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Номер телефона</Text>

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99", // Маска
                }}
                value={phoneValue} // Значение с маской
                onChangeText={handleInputChange} // Обработчик изменения текста
                keyboardType="phone-pad"
                style={Style.textInputProfile}
                placeholder="+7 (999) 999-99-99"
                onFocus={handleFocus} // Устанавливаем шаблон при фокусе
              />
                <Text style={Style.titleSimple}>Пароль</Text>

                <TextInput
                  style={Style.textInputProfile}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecure}
                  placeholder="Пароль"
                />
                <TouchableOpacity>
                  <Text style={StyleSheet.flatten([Style.subtitle, {color:"silver", marginTop: 4}])}>Напомнить пароль</Text>
                </TouchableOpacity>
            </View>
            <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
                <TouchableOpacity
                    style={Style.buttonMenuPage}
                    onPress={() => handleNext()}
                >
                    <Text style={Style.blackText} >Далее</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Start")}>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyle = StyleSheet.create({
  TouchFogotPass:{

  }
})