import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Toast from "../Notif/toasts/Toast";
import styles from "../../Styles/Style"; // Глобальные стили

export default function StartPage({ navigation }) {
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
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

        <View style={StyleSheet.flatten([styles.header, { marginTop: 150 }])}>
          <Text style={StyleSheet.flatten([styles.titleHead])}>Добро пожаловать!</Text>
          <Text
            style={StyleSheet.flatten([
              styles.subtitle,
              { marginLeft: 15, marginRight: 15 },
            ])}
          >
            Войдите или зарегистрируйтесь, чтобы получить полный доступ к
            приложению.
          </Text>
        </View>

        <View style={StyleSheet.flatten([styles.buttons, {top: "-15%"}])}>
          <TouchableOpacity
            style={styles.WhiteButton}
            onPress={() => navigation.replace("Register")}
          >
            <Text style={styles.blackText}>Регистрация</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StyleSheet.flatten([
              styles.DefButton,
              { borderBottomLeftRadius: 10, borderTopLeftRadius: 0 },
            ])}
            onPress={() => navigation.replace("Auth")}
          >
            <Text style={StyleSheet.flatten([styles.DefText, {}])}>Вход</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={StyleSheet.flatten([
              styles.DefButton,
              { borderBottomLeftRadius: 10, borderTopLeftRadius: 0 },
            ])}
            onPress={() => showToast("", "Успех!", "Успешный успех!")}
          >
            <Text style={styles.DefText}>Тест</Text>
          </TouchableOpacity> */}
        </View>

        <Text
          style={StyleSheet.flatten([
            styles.footerText,
            { color: "silver", marginLeft: 15, marginRight: 15 },
          ])}
        >
          Удобные инструменты позволяют вашему бизнесу быть в курсе и оперативно
          реагировать на пожелания клиента.
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
}