import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function StartPage({ navigation }) {
  return (
    <ImageBackground style={styles.background}>
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
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>Регистрация</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Вход</Text>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  registerButton: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  registerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  loginButton: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  footerText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
});
