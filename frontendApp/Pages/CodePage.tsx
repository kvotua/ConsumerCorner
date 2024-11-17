import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Image, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
    Start: undefined;
    Register: undefined;
    CodeConfirm: {phone: string}
  };
  
  type CodePageNavigationProp = StackNavigationProp<RootStackParamList, "Register">;
  
  interface CodePageProps {
    navigation: CodePageNavigationProp;
  }

export default function CodePage({navigation, route } : CodePageProps) {
    const { phone } = route.params;
  return (
    <ImageBackground source={require("../Img/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Код подтверждения</Text>
            </View>
            <View style={styles.fields}>
              <Text style={styles.titleSimple}>Введите код подтверждения из SMS - сообщнеия, отправленного на номер {phone}</Text>
              <TextInput style={styles.TextField} placeholder="Код подтверждения" />
              <Text style={styles.subtitle}>Код действует еще .. секунд</Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText} onPress={() => navigation.navigate("Register")}>Назад</Text>
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
    marginTop:-10,
    fontSize: 13,
    marginLeft: "-48%"
  },
});
