import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";

export default function RegPage({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [rawPhone, setRawPhone] = useState(""); // Пароль без обработк
  const [formattedPhone, setFormattedPhone] = useState(""); // С обработкой

  const handlePhoneChange = (text: string) => {
    // Удаляем всё, кроме цифр
    const cleaned = text.replace(/[^0-9]/g, "");

    // Форматируем номер, скрывая средние цифры
    const formatted = formatPhone(cleaned);

    setRawPhone(cleaned); // Сохраняем полный номер
    setFormattedPhone(formatted); // Сохраняем форматированный номер
  };

  const formatPhone = (text: string) => {
    if (text.length === 0) return "+";

    const firstDigit = text[0]; // Первая цифра
    const lastTwoDigits = text.slice(-2); // Последние две цифры
    const hiddenPart = text
      .slice(1, -2) // Средние цифры
      .replace(/\d/g, "X"); // Скрываем все цифры

    return `+${firstDigit} ${hiddenPart} ${lastTwoDigits}`;
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.header}>
              <Text style={Style.title}>Регистрация</Text>
            </View>
            <View style={Style.fields}>
              <Text style={styles.titleSimple}>Телефон</Text>

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99",
                }}
                keyboardType="phone-pad"
                style={Style.TextField}
                placeholder="+7 (999) 999 99 99"
                onChangeText={handlePhoneChange}
              />

              <Text style={styles.titleSimple}>Пароль</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={Style.TextField}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecure}
                  placeholder="Пароль"
                />
                <TouchableOpacity
                  onPress={toggleSecureTextEntry}
                  style={styles.iconButton}
                ></TouchableOpacity>
              </View>

              <Text style={styles.titleSimple}>Ф.И.О</Text>
              <TextInput style={Style.TextField} placeholder="Ф.И.О" />
            </View>

            <View style={Style.buttons}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() =>
                  navigation.navigate("CodeConfirm", { phone: formattedPhone })
                }
              >
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.navigate("Start")}>
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  titleSimple: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  passwordContainer: {
    position: "relative",
    width: 350,
    marginBottom: 15,
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#007BFF",
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
});
