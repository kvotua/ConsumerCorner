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
import Style from "../../Styles/Style";
import Toast from "../Notif/toasts/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { SesIdToken } from "@/app/AsyncStore/StoreTokens";

export default function InputPasswordPR({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type, message, subMessage) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const checkPassword = () => {
    if (password !== confirmPassword) {
      showToast("error", "Ошибка!", "Пароли не совпадают");
      return false;
    }
    return true;
  };

  const goToCodePage = async () => {
    if (!checkPassword()) return; // Проверяем пароли перед отправкой
    const ses = await SesIdToken(); 

    try {
      const payload = {
        req_id: ses,
        password: password
      }
      // Здесь добавьте логику для отправки пароля на сервер, если это необходимо
      const data = await fetch('https://consumer-corner.kvotua.ru/password/restore', {
        method: "POST",
        headers: {
          'accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Отправляем пароль
      });

      const res2 = await data.json();
      if (res2.detail === "Password changed successfully") {
        // Если пароль успешно изменен, перенаправляем на экран авторизации
        navigation.replace("Auth");
      } else {
        // В противном случае показываем ошибку в тосте
        const text = res2.detail || "Неизвестная ошибка";
        showToast("error", "Ошибка!", text);
      }
    } catch (error) {
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
          <Text style={Style.titleSimple}>Пароль</Text>
          <TextInput
            returnKeyType="done"
            style={Style.textInputProfile}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isSecure}
            placeholder="Пароль"
          />
        </View>
        <View style={Style.fields}>
          <Text style={Style.titleSimple}>Подтверждение пароля</Text>
          <TextInput
            returnKeyType="done"
            style={Style.textInputProfile}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={isSecure}
            placeholder="Подтвердите пароль"
          />
        </View>
        <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
          <TouchableOpacity
            style={Style.buttonMenuPage}
            onPress={goToCodePage}
          >
            <Text style={Style.blackText}>Далее</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Добавьте ваши стили здесь, если необходимо
});

