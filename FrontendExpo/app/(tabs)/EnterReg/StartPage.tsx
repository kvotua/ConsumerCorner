import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "../Notif/toasts/Toast";
import styles from "../../Styles/Style"; // Глобальные стили

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

export default function StartPage({ navigation }) {
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };


  return (
    <>
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.containerMainPage}>
        {toast.visible && (
          <Toast
            type={toast.type}
            message={toast.message}
            subMessage={toast.subMessage}
            visible={toast.visible}
            onDismiss={() => setToast({ ...toast, visible: false })}
          />
        )}
      
        <View style={StyleSheet.flatten([styles.header, { marginTop: 100 }])}>
          <Text style={StyleSheet.flatten([styles.titleHead])}>Добро пожаловать!</Text>
          <Text
            style={StyleSheet.flatten([
              styles.subtitle
            ])}
          >
            Войдите или зарегистрируйтесь, чтобы получить полный доступ к
            приложению.
          </Text>
        </View>

        <View style={StyleSheet.flatten([styles.containerButtonsMenuPages, {justifyContent: 'center', alignItems: "center",}])}>
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
        </View>
        
        <View style={localStyles.footerTextContainer}>
          <Text style={localStyles.footerText}>
            Удобные инструменты позволяют вашему бизнесу быть в курсе и оперативно
            реагировать на пожелания клиента
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
    </>
  );
}

const localStyles = StyleSheet.create({
  footerText: {
    fontSize: isTablet ? 16 : 12,
    color: "silver",
    textAlign: "center",
    fontFamily: 'Montserrat',
    marginBottom: 15,
    fontWeight: "400",
  },
  footerTextContainer: {
      flex: isTablet ? 1 : 1,
      justifyContent: 'flex-end',
  }
});