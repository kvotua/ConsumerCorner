import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import styles from "../../Styles/Style";// <--- это файл глобальных стилей

export default function StartPage({ navigation }) {
  return (
    // картинку на бэк я не смог перенести ни в какую, поэтому тольо в таком формате ее надо будет оставить, если найдешь варик, то напишешь
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Добро пожаловать!</Text>
          <Text style={styles.subtitle}>
            Войдите или зарегистрируйтесь, чтобы получить полный доступ к
            приложению.
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.WhiteButton}
            onPress={() => navigation.replace("Register")}
          >
            <Text style={styles.blackText}>Регистрация</Text>
          </TouchableOpacity>
          <TouchableOpacity style={StyleSheet.flatten([styles.DefButton, {borderBottomLeftRadius: 20, borderTopLeftRadius: 0}])} onPress={() => navigation.replace("Auth")}>
            <Text style={styles.DefText}>Вход</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Удобные инструменты позволяют вашему бизнесу быть в курсе и оперативно
          реагировать на пожелания клиента.
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
}