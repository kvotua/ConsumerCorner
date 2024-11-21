import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StyleSheet,
} from "react-native";
import styles from "../../Styles/Style"; // Глобальные стили

export default function StartPage({ navigation }) {

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={StyleSheet.flatten([styles.header, { marginTop: 150 }])}>
          <Text style={styles.title}>Добро пожаловать!</Text>
          <Text
            style={StyleSheet.flatten([
              styles.subtitle,
              { marginLeft: 30, marginRight: 30 },
            ])}
          >
            Войдите или зарегистрируйтесь, чтобы получить полный доступ к
            приложению.
          </Text>
        </View>

        <View style={StyleSheet.flatten([styles.buttons, { marginTop: -200 }])}>
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
            <Text style={styles.DefText}>Вход</Text>
          </TouchableOpacity>
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