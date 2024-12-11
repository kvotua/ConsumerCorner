import React, { useState } from "react";
import {
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
import Icon from 'react-native-vector-icons/Feather';
import Toast from "../Notif/toasts/Toast";

export default function RegPage({ navigation }) {
  const [fio, setfio] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [phoneValue, setPhoneValue] = useState(""); // Значение для отображения с маской
  const [rawPhoneValue, setRawPhoneValue] = useState(""); // Очищенное значение для передачи
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (!regexPass.test(password)) {
      setErrorMessage("Пароль должен содержать минимум 8 символов, заглавные буквы, цифры и спец символы.");
      return false;
    }
    if (!regexFio.test(fio)) { // Здесь вы можете заменить phoneValue на поле ФИО, если оно у вас есть
      setErrorMessage("ФИО должно быть в формате 'Фамилия Имя' или 'Фамилия Имя Отчество'.");
      return false;
    }
    setErrorMessage(""); // Сбросить сообщение об ошибке, если все в порядке
    return true;
  };

  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const regexFio = /^(?:[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+){1,2})$/u;

  const handleInputChange = (text) => {
    // Устанавливаем значение с маской для отображения
    setPhoneValue(text);

    // Извлекаем только цифры из введенного значения
    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
    console.log(numericValue)
  };

  const handleFocus = () => {
    // Устанавливаем маску при первом фокусе
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  const handleNext = async () => {
    navigation.replace("CodeConfirm")
    if (!validateInputs()) {
      showToast("error", "Ошибка!", errorMessage);
      return;
    }
    const url = 'http://localhost:8765/registration';
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          phone: `${rawPhoneValue}`,
          fio: fio,             
          password: password   
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка сервера");
      }

      const data = await response.json();
      navigation.replace("CodeConfirm")
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={[Style.header, {marginTop:40}]}>
              <Text style={Style.titleHead}>Регистрация</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Телефон</Text>

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
              <View style={Style.passwordContainer}>
                <TextInput
                  style={Style.textInputProfile}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecure}
                  placeholder="Пароль"
                />
                <TouchableOpacity
                  onPress={toggleSecureTextEntry}
                  style={Style.iconButton}
                >
                  <Icon name={isSecure ? 'eye-off' : 'eye'} size={24} color="#00000" />
                </TouchableOpacity>
              </View>

              <Text style={Style.titleSimple}>Ф.И.О</Text>
              <TextInput style={Style.textInputProfile} placeholder="Ф.И.О" autoCapitalize="words" onChangeText={setfio}/>
            </View>

            <View style={[Style.buttons, {paddingVertical: -10,}]}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() => {
                  // Пример передачи нормализованного значения
                  console.log("Отправляем номер телефона:", rawPhoneValue);
                  handleNext();
                }}
              >
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Start")}>
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}