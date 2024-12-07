import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform, 
  ScrollView
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Style from "@/app/Styles/Style";
import { TextInputMask } from "react-native-masked-text";
import { TextInput } from "react-native-gesture-handler";

export default function MarketPoint({ navigation }) {
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  const handleInputChange = (text) => {
    setValue(text);
  };
  const handleInputChange2 = (text) => {
    setValue2(text);
  };
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
            <ScrollView contentContainerStyle={[{flexGrow: 1, paddingRight: 10}]} indicatorStyle="white">
            <View style={StyleSheet.flatten([Style.fields])}>
              <Text style={Style.titleSimple}>Адрес торговой точки</Text>

              <TextInput
                style={Style.textInputProfile}
                placeholder="ул. Пушкина дом Победы 32"
              />

              <Text style={Style.titleSimple}>Рабочее название магазина</Text>
              <View style={Style.passwordContainer}>
                <TextInput
                    style={Style.textInputProfile}
                    placeholder="Пироги"
                />
              </View>

              <Text style={Style.titleSimple}>Открытие точки</Text>
              <TextInputMask
                type={"custom"}
                 options={{
                  mask: "99:99",
                   }}
                   value={value}
                   onChangeText={handleInputChange}
               style={StyleSheet.flatten([Style.textInputProfile, {width:"30%"}])} keyboardType="phone-pad" placeholder="11:00" />

              <Text style={Style.titleSimple}>Закрытие точки</Text>
              <TextInputMask 
                type={"custom"}
                options={{
                  mask: "99:99",
                  }}
                  value={value2}
                  onChangeText={handleInputChange2}
              style={StyleSheet.flatten([Style.textInputProfile, {width:"30%"}])} keyboardType="phone-pad" placeholder="22:00" />
            </View>
            </ScrollView>

            <View style={[Style.containerButtonsMenuPages]}>
              <TouchableOpacity style={Style.buttonMenuPage} onPress={() => navigation.replace("MenuPage")}>
                  <Text style={Style.textInButtonsMenuPage}>Завершение регистрации</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("RegFirma")}>
                  <Text style={Style.textInButtonsBackMenuPage}>Назад</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}