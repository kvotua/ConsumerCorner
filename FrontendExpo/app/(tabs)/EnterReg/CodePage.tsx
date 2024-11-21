import React from "react";
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
  Platform,
} from "react-native";
import Style from "../../Styles/Style"

export default function CodePage({ navigation}) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.header}>
              <Text style={styles.title}>Код подтверждения</Text>
            </View>
            <View style={Style.fields}>
              <Text style={styles.titleSimple}>
                Введите код подтверждения из SMS - сообщнеия, отправленного на
                номер
              </Text>
              <TextInput
                style={Style.TextField}
                placeholder="Код подтверждения"
              />
              <Text style={styles.subtitle}>Код действует еще .. секунд</Text>
            </View>

            <View style={Style.buttons}>
              <TouchableOpacity style={Style.WhiteButton} onPress={() => navigation.replace("Inn")}>
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Register")}>
                <Text
                  style={Style.DefText}
                >
                  Назад
                </Text>
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
  fields: {
    width: "100%",
    alignItems: "center",
  },
  TextField: {
    width: 350,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
    paddingLeft: 10,
    marginBottom: 15,
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
  subtitle: {
    marginTop: -10,
    fontSize: 13,
    marginLeft: "-48%",
  },
});
