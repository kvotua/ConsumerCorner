import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Style from "@/app/Styles/Style";
import { TextInput } from "react-native-gesture-handler";

export default function MarketPoint({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={Style.headerLeft}>
              <Text style={Style.title}>Зарегистрируйте </Text>
              <Text style={styles.title}>торговую точку</Text>
            </View>
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.fields}>
              <Text style={styles.titleSimple}>Адресс торговой точки</Text>

              <TextInput
                keyboardType="phone-pad"
                style={Style.TextField}
                placeholder="ул. Пушкина дом Победы 32"
              />

              <Text style={styles.titleSimple}>Рабочее название магазина</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                    keyboardType="phone-pad"
                    style={Style.TextField}
                    placeholder="Pirogi"
                />
              </View>

              <Text style={styles.titleSimple}>Открытие точки</Text>
              <TextInput style={StyleSheet.flatten([Style.TextField, {width:"30%", marginLeft: "-70%"}])} placeholder="11:00" />

              <Text style={styles.titleSimple}>Закрытие точки</Text>
              <TextInput style={StyleSheet.flatten([Style.TextField, {width:"30%", marginLeft: "-70%"}])} placeholder="22:00" />
            </View>

            <View style={Style.buttons}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() =>
                  navigation.replace("CodeConfirm")
                }
              >
                <Text style={Style.blackText} onPress={() => navigation.replace("MenuPage")}>Завершение регистрации</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("RegFirma")}>
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
  headerLeft: {
    alignItems: "flex-start",
    marginTop: -50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSimple: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  titleSimple2: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 3,
    alignSelf: "flex-start",
  },
  passwordContainer: {
    position: "relative",
    width: 350,
    marginBottom: 15,
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "right",
    marginBottom: 10,
    textDecorationLine: "none"
  },
  TextField: {
    width: 350,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
    paddingLeft: 10,
  },
});
