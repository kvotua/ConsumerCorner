import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Animated,
  Easing
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Toast from "../Notif/toasts/Toast";
import { handleNext, SendNumber } from "@/Api/EnterRoot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import { decodeJwt } from "@/app/AsyncStore/Decode";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiRequest } from "@/Api/RefreshToken";

export default function Enter({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [phoneValue, setPhoneValue] = useState("");
  const [rawPhoneValue, setRawPhoneValue] = useState("");
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const shakeAnimPhone = useRef(new Animated.Value(0)).current;
  const shakeAnimPassword = useRef(new Animated.Value(0)).current;

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const handleInputChange = (text) => {
    setPhoneValue(text);

    const numericValue = text.replace(/\D/g, "");
    setRawPhoneValue(numericValue);
  };

  const startShakeAnimation = (animation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 5,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -5,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };

  const SendtoServer = async () => {
    if (rawPhoneValue.length !== 11) {
      showToast("error", "Ошибка!", "Введите корректный номер телефона!");
      startShakeAnimation(shakeAnimPhone);  // Запускаем анимацию для телефона
      return;
    }
    if (!password) {
      showToast("error", "Ошибка!", "Введите пароль!");
      startShakeAnimation(shakeAnimPassword);  // Запускаем анимацию для пароля
      return;
    }

    try {
      const data = await handleNext(rawPhoneValue, password);
      if (data.access_token || data.refresh_token) {
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        const token = await AccessGetToken();
        const decodeToken = decodeJwt(token);
        if (decodeToken.verify_phone !== false) {
          navigation.replace("MenuPage");
        } else {
          const url2 = 'https://consumer-corner.kvotua.ru/verify/phone/send';
          const jwt = await AccessGetToken();
          const data2 = await apiRequest(
            url2,
            "POST",
            {
              Authorization: `Bearer ${jwt}`,
            },
            {
              "Content-Type": "application/json",
            }
          );
          if (data2.req_id) {
            await AsyncStorage.setItem('Ses_id', String(data2.req_id));
          } else {
            const errorMessages: { [key: string]: string } = {
              "Invalid ID or code": "Неверный код!",
            };
            const text = errorMessages[data2.detail] || data2.detail || "Неизвестная ошибка";
            showToast("error", "Ошибка!", text);
          }
          navigation.replace("CodeConfirmEnt");
        }
      } else {
        const errorMessages: { [key: string]: string } = {
          "The user was not found": "Пользователь не найден",
          "Invalid password": "Неправильный пароль",
        };
        const text = errorMessages[data.detail] || data.detail || "Неизвестная ошибка";
        showToast("error", "Ошибка!", text);
      }
      if (data.message === "Input should be a valid dictionary or object to extract fields from") {
        showToast("error", "Ошибка!", data.message || "Неверный логин или пароль");
      }
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
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
            onDismiss={() => setToast({ ...toast, visible: false })}
          />
        )}
        <View style={[Style.menuHeader, { alignItems: "center", }]}>
          <Text style={StyleSheet.flatten([Style.titleHead])}>Вход</Text>
        </View>
        <View style={Style.fields}>
          <Text style={Style.titleSimple}>Номер телефона</Text>
          <Animated.View style={[{ transform: [{ translateX: shakeAnimPhone }] }]}>
            <TextInputMask
              returnKeyType="done"
              type={"custom"}
              options={{
                mask: "+7 (999) 999-99-99",
              }}
              value={phoneValue}
              onChangeText={handleInputChange}
              keyboardType="phone-pad"
              style={Style.textInputProfile}
              placeholder="+7 (999) 999-99-99"
              onFocus={handleFocus}
            />
          </Animated.View>

          <Text style={Style.titleSimple}>Пароль</Text>
          <Animated.View style={[{ transform: [{ translateX: shakeAnimPassword }] }]}>
            <TextInput
              returnKeyType="done"
              style={Style.textInputProfile}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={isSecure}
              placeholder="Пароль"
            />
          </Animated.View>
          <TouchableOpacity onPress={() => navigation.replace("InputPhonePR")}>
            <Text style={StyleSheet.flatten([Style.subtitle, { color: "silver", marginTop: 4 }])}>Восстановить пароль</Text>
          </TouchableOpacity>
        </View>
        <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
          <TouchableOpacity
            style={Style.buttonMenuPage}
            onPress={SendtoServer}
          >
            <Text style={Style.blackText}>Далее</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Start")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={Style.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
