import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";

export default function Enter({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={[Style.menuHeader, {alignItems: "center",}]}>
              <Text style={StyleSheet.flatten([Style.titleHead])}>Вход</Text>
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
                  <Text style={StyleSheet.flatten([Style.subtitle, {color:"silver"}])}>Напомнить пароль</Text>
                </TouchableOpacity>

                <View style={StyleSheet.flatten([Style.buttons, {marginTop:250}])}>
                <TouchableOpacity
                    style={Style.WhiteButton}
                    onPress={() => navigation.replace("MenuPage")}
                >
                    <Text style={Style.blackText} >Далее</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Start")}>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyle = StyleSheet.create({
  TouchFogotPass:{

  }
})