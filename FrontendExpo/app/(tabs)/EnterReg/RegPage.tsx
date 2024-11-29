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

export default function RegPage({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [phoneValue, setPhoneValue] = useState(""); // Значение для отображения с маской
  const [rawPhoneValue, setRawPhoneValue] = useState(""); // Очищенное значение для передачи

  const handleInputChange = (text) => {
    // Устанавливаем значение с маской для отображения
    setPhoneValue(text);

    // Извлекаем только цифры из введенного значения
    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
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

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
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
              <TextInput style={Style.textInputProfile} placeholder="Ф.И.О" autoCapitalize="words" />
            </View>

            <View style={[Style.buttons, {paddingVertical: -10,}]}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() => {
                  // Пример передачи нормализованного значения
                  console.log("Отправляем номер телефона:", rawPhoneValue);
                  navigation.replace("CodeConfirm");
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