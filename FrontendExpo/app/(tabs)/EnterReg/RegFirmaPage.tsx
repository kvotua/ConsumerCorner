import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from 'react-native-vector-icons/Feather';
import Share from "../../../assets/images/svg/share.svg";

export default function RegFirma({ navigation }) {
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  const handleInputChange = (text : string) => {
    setValue(text);
  };

  const handleInputChange2 = (text : string) => {
    setValue2(text);
  };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <View style={Style.headerLeft}>
          <Text style={Style.titleHead}>Зарегистрируйте </Text>
          <Text style={Style.titleHead}>фирму</Text>
          <View style={StyleSheet.flatten([Style.containerLine])}>
            <View style={Style.menuPagesLine} />
          </View>
        </View>

        {/* Контейнер для ScrollView */}
        <ScrollView contentContainerStyle={localStyles.scrollViewContent} indicatorStyle="white">
          <View style={StyleSheet.flatten([localStyles.fields])}>
            <Text style={Style.titleSimple}>Название фирмы</Text>
            <TextInputMask
              type={"custom"}
              value={value}
              onChangeText={handleInputChange}
              style={Style.textInputProfile}
              placeholder="Строй Загарод"
            />

            <Text style={Style.titleSimple}>ОГРН юридического лица</Text>
            <View style={Style.passwordContainer}>
              <TextInputMask
                type={"custom"}
                options={{
                  mask: "9999999999999",
                }}
                value={value2}
                onChangeText={handleInputChange2}
                keyboardType="phone-pad"
                style={Style.textInputProfile}
                placeholder="1147847423899"
              />
            </View>

            <Text style={StyleSheet.flatten([Style.titleSimple, { padding: -5 }])}>Фактический адрес</Text>
            <TextInput style={Style.textInputProfile} placeholder="ул. Павлика Морозова 74Б" />

            <Text style={Style.titleSimple}>Основной вид деятельности</Text>
            <TextInput style={Style.textInputProfile} placeholder="Частное предприятие" />

            <View style={localStyles.passwordContainer}>
              <Text style={StyleSheet.flatten([Style.titleSimple, { marginTop: 15, fontSize: 12 }])}>
                Пригласите партнеров и
              </Text>
              <Text style={StyleSheet.flatten([Style.titleSimple, { marginTop: 0, fontSize: 12 }])}>
                собственников бизнеса
              </Text>

              <View style={localStyles.iconButtonContainer}>
                <TextInput style={Style.textInputProfile} placeholder="https://Invite.ru" />
                <TouchableOpacity
                  style={[localStyles.button, { margin: 35 }]}
                >
                  <Icon name={'copy'} size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={[localStyles.button]}>
                  <Share />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Контейнер для кнопок */}
        <View style={[localStyles.containerButtonsMenuPages, { marginTop: 10 }]}>
        <TouchableOpacity style={Style.buttonMenuPage} onPress={() => navigation.replace("MarketInfo")}>
            <Text style={Style.textInButtonsMenuPage}>Далее</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Inn")}>
            <Text style={Style.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Растягиваем ScrollView на доступное пространство
    paddingRight: 10,
  },
  fields: {
    width: "100%",
  },
  passwordContainer: {},
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    flex: 1, // Take up the remaining space
  },
  button: {
    position: 'absolute', // Position the buttons absolutely
    right: 5, // Position the buttons to the right
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  containerButtonsMenuPages: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: 'flex-end',
    flexDirection: 'column',  // ensure the buttons stack vertically
    alignItems: 'center',     // center the buttons horizontally
  },
});
