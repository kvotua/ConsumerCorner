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
import Style from "../../Styles/Style"
import Toast from "../Notif/toasts/Toast";
import { AccessGetToken, SesIdToken } from "@/app/AsyncStore/StoreTokens";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";

export default function InputPhonePR({ navigation }) {
  const [phoneValue, setPhoneValue] = useState("");
  const [rawPhoneValue, setRawPhoneValue] = useState("");
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });


  const handleInputChange = (text) => {
    setPhoneValue(text);

    const numericValue = text.replace(/\D/g, "");
    setRawPhoneValue(numericValue);
  };

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };
  const handleFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };

  const goToCodePage = async () => {
    try {
      const data = await fetch('https://consumer-corner.kvotua.ru/password/phone/send/', {
        method: "POST",
        headers: {
          'accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawPhoneValue),
      })

      const res2 = await data.json();
      if (res2.req_id) {
        await AsyncStorage.setItem('Ses_id', String(res2.req_id));
        navigation.replace("InputCodePR");
      } else {
        const errorMessages: { [key: string]: string } = {
          "User not found": "Пользователь не найден",
          "The phone number has not been verified": "Номер телефона не подтвержден",
          "Error when sending sms": "Ошибка при отправке SMS",
        };
    
        // Получаем текст ошибки на русском
        const text = errorMessages[res2.detail as keyof typeof errorMessages] || res2.detail || "Неизвестная ошибка";
        showToast("error", "Ошибка!", text);
      }
    } catch (error) {
      // Обрабатываем ошибку и показываем тост
      showToast("error", "Ошибка!", error.message || "Неизвестная ошибка");
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
          <Text style={StyleSheet.flatten([Style.titleHead])}>Восстановление пароля</Text>
        </View>
        <View style={Style.fields}>
          <Text style={Style.titleSimple}>Номер телефона</Text>
          <TextInputMask
            returnKeyType="done"
            type={"custom"}
            options={{
              mask: "+7 (999) 999-99-99",
            }}
            value={phoneValue}
            returnKeyType="done"
            onChangeText={handleInputChange}
            keyboardType="phone-pad"
            style={Style.textInputProfile}
            placeholder="+7 (999) 999-99-99"
            onFocus={handleFocus}
          />
        </View>
        <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
          <TouchableOpacity
            style={Style.buttonMenuPage}
            onPress={goToCodePage}
          >
            <Text style={Style.blackText} >Далее</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Auth")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={Style.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function showToast(arg0: string, arg1: string, arg2: any) {
  throw new Error("Function not implemented.");
}
