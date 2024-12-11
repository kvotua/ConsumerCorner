import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from 'react-native-vector-icons/Feather';
import Share from "../../../assets/images/svg/share.svg";
import { SendInfFirm } from "@/Api/RegFirmaRoot";

export default function RegFirma({ navigation, route}) {
  const {companyData} = route.params;
  const [NameFima, setValue] = useState();
  const [OGRN, setValue2] = useState();
  const [Adress, setValue3] = useState();
  const [VidDo, setValue4] = useState();
  const [isAddressFilled, setIsAddressFilled] = useState(false); // Состояние для отслеживания заполненности адреса
  const [isOgrnFilled, setIsOgrnFilled] = useState(false); // Состояние для отслеживания заполненности ОГРН


  useEffect(() => {
    if (companyData) {
      setValue2(companyData.ogrn);
      setValue3(companyData.address);
      setIsOgrnFilled(!!companyData.ogrn); // Устанавливаем состояние в зависимости от наличия ОГРН
      setIsAddressFilled(!!companyData.address); // Устанавливаем состояние в зависимости от наличия адреса
    }
  }, [companyData]);

  const SendToServerReg = async () =>{
    console.log(NameFima, OGRN, Adress, VidDo)
    const res = await SendInfFirm(NameFima, OGRN, Adress, VidDo)
    if(!res)
      return
    navigation.replace("MarketInfo")
  }


  const handleInputChange = (text : string) => {
    setValue(text);

  };

  const handleInputChange2 = (text : string) => {
    setValue2(text);
  };

  const handleInputChange3 = (text : string) => {
    setValue3(text);
  };

  const handleInputChange4 = (text : string) => {
    setValue4(text);
  };

  const { width } = Dimensions.get('window');

const isTablet = width >= 768;

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
            <TextInput
              value={NameFima}
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
                value={OGRN}
                onChangeText={handleInputChange2}
                keyboardType="phone-pad"
                style={[
                  Style.textInputProfile,
                  isOgrnFilled ? { backgroundColor: '#fddb67' } : {}
                ]}
                placeholder="1147847423899"
              />
            </View>

            <Text style={StyleSheet.flatten([Style.titleSimple, { padding: -5 }])}>Фактический адрес</Text>
            <TextInput               style={[
                Style.textInputProfile,
                isAddressFilled ? { backgroundColor: '#fddb67' } : {}
              ]} placeholder="ул. Павлика Морозова 74Б" value={Adress}
                onChangeText={handleInputChange3}/>

            <Text style={Style.titleSimple}>Основной вид деятельности</Text>
            <TextInput style={Style.textInputProfile} placeholder="Частное предприятие"                 value={VidDo}
                onChangeText={handleInputChange4}/>

            <View style={localStyles.passwordContainer}>
              <Text style={StyleSheet.flatten([Style.titleSimple, { marginTop: 15, fontSize: 16 }])}>
                Пригласите партнеров и
              </Text>
              <Text style={StyleSheet.flatten([Style.titleSimple, { marginTop: 0, fontSize: 16 }])}>
                собственников бизнеса
              </Text>

              <View style={localStyles.iconButtonContainer}>
                <TextInput style={Style.textInputProfile} placeholder="https://Invite.ru" />
                <TouchableOpacity
                  style={[localStyles.button, { marginEnd: 52}]}
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
        <View style={[localStyles.containerButtonsMenuPages, { marginTop: 10, height : isTablet ? 150 : "auto" }]}>
        <TouchableOpacity style={Style.buttonMenuPage} onPress={async () => await SendToServerReg()}>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center"
  },
  iconButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    flex: 1, // Take up the remaining space
  },
  button: {
    height: "100%",
    position: 'absolute', // Position the buttons absolutely
    right: 20, // Position the buttons to the right
    alignItems: 'center',
    justifyContent:"center"
  },
  containerButtonsMenuPages: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: 'flex-end',
    flexDirection: 'column',  // ensure the buttons stack vertically
    alignItems: 'center',     // center the buttons horizontally
  },
});
