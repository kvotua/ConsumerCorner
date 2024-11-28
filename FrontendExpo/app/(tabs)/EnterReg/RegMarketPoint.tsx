import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Style from "@/app/Styles/Style";
import { TextInput } from "react-native-gesture-handler";

export default function MarketPoint({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={Style.headerLeft}>
              <Text style={Style.titleHead}>Зарегистрируйте </Text>
              <Text style={Style.titleHead}>торговую точку</Text>
              <View style={StyleSheet.flatten([Style.containerLine])}>
              <View style={Style.menuPagesLine}/>
              </View>
            </View>
            <View style={StyleSheet.flatten([Style.fields])}>
              <Text style={Style.titleSimple}>Адресс торговой точки</Text>

              <TextInput
                keyboardType="phone-pad"
                style={Style.TextField}
                placeholder="ул. Пушкина дом Победы 32"
              />

              <Text style={Style.titleSimple}>Рабочее название магазина</Text>
              <View style={Style.passwordContainer}>
                <TextInput
                    keyboardType="phone-pad"
                    style={Style.TextField}
                    placeholder="Pirogi"
                />
              </View>

              <Text style={Style.titleSimple}>Открытие точки</Text>
              <TextInput style={StyleSheet.flatten([Style.TextField, {width:"30%"}])} placeholder="11:00" />

              <Text style={Style.titleSimple}>Закрытие точки</Text>
              <TextInput style={StyleSheet.flatten([Style.TextField, {width:"30%"}])} placeholder="22:00" />
            </View>

            <View style={[Style.buttons]}>
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}