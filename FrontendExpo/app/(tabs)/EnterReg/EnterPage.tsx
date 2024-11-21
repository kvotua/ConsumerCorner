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
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";

export default function Enter({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={StyleSheet.flatten([Style.scrollContainer, {marginTop: 150}])}>
            <View style={Style.header}>
              <Text style={Style.title}>Вход</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Номер телефона</Text>

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99",
                }}
                keyboardType="phone-pad"
                style={Style.TextField}
                placeholder="+7 (999) 999 99 99"
              />
                <Text style={Style.titleSimple}>Пароль</Text>

                <TextInput
                style={Style.TextField}
                placeholder="Пароль"
                />
                <TouchableOpacity>
                  <Text style={StyleSheet.flatten([Style.subtitle, {color:"silver", marginTop:20, marginLeft: "-55%"}])}>Напомнить пароль</Text>
                </TouchableOpacity>

                <View style={StyleSheet.flatten([Style.buttons, {marginTop:200}])}>
                <TouchableOpacity
                    style={Style.WhiteButton}
                    onPress={() =>
                    navigation.replace("CodeConfirm")
                    }
                >
                    <Text style={Style.blackText} onPress={() => navigation.replace("MenuPage")}>Далее</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Start")}>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}