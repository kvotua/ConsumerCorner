import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import { SendInfFirm } from "@/Api/RegFirmaRoot";
import Icons from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import IconImg from '../../../assets/images/svg/Icon.svg';

export default function RegFirmaAuth({ navigation }) {
  const [NameFima, setValue] = useState();
  const [OGRN, setValue2] = useState();
  const [Adress, setValue3] = useState();
  const [VidDo, setValue4] = useState();
  const [isAddressFilled, setIsAddressFilled] = useState(false);
  const [isOgrnFilled, setIsOgrnFilled] = useState(false);
  const [logo, setLogo] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Разрешите доступ к галерее для прикрепления логотипа!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const SendToServerReg = async () => {
    console.log(NameFima, OGRN, Adress, VidDo);
    const res = await SendInfFirm(NameFima, OGRN, Adress, VidDo);
    if (!res) return;
    navigation.replace("MarketInfo");
  };

  const handleInputChange = (text) => setValue(text);
  const handleInputChange2 = (text) => setValue2(text);
  const handleInputChange3 = (text) => setValue3(text);
  const handleInputChange4 = (text) => setValue4(text);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <View style={Style.headerLeft}>
          <Text style={Style.titleHead}>Зарегистрируйте </Text>
          <Text style={Style.titleHead}>фирму</Text>
          <View style={Style.containerLine}>
            <View style={Style.menuPagesLine} />
          </View>
        </View>

        <ScrollView contentContainerStyle={[localStyles.scrollViewContent, {marginRight: 5}]} indicatorStyle="white">
          <View style={localStyles.fields}>
            <Text style={Style.titleSimple}>Название фирмы</Text>
            <TextInput
            returnKeyType="done"
              value={NameFima}
              onChangeText={handleInputChange}
              style={Style.textInputProfile}
              placeholder="Строй Загарод"
            />

            <Text style={Style.titleSimple}>ОГРН юридического лица</Text>
            <TextInputMask
            returnKeyType="done"
              type={"custom"}
              options={{ mask: "9999999999999" }}
              value={OGRN}
              onChangeText={handleInputChange2}
              keyboardType="phone-pad"
              style={[Style.textInputProfile, isOgrnFilled && { backgroundColor: '#fddb67' }]}
              placeholder="1147847423899"
            />

            <Text style={Style.titleSimple}>Фактический адрес</Text>
            <TextInput
            returnKeyType="done"
              style={[Style.textInputProfile, isAddressFilled && { backgroundColor: '#fddb67' }]}
              placeholder="ул. Павлика Морозова 74Б"
              value={Adress}
              onChangeText={handleInputChange3}
            />

            <Text style={Style.titleSimple}>Основной вид деятельности</Text>
            <TextInput
            returnKeyType="done"
              style={Style.textInputProfile}
              placeholder="Частное предприятие"
              value={VidDo}
              onChangeText={handleInputChange4}
            />
          </View>
            <View style={localStyles.centeredContainer}>
              <View style={localStyles.transparentContainer}>
                <TouchableOpacity style={localStyles.uploadBox} onPress={pickImage}>
                  {logo ? (
                    <Image source={{ uri: logo }} style={localStyles.image} />
                  ) : (
                    <>
                      <View style={localStyles.iconBox}>
                        <IconImg width={100} height={100}/>
                      </View>
                      <Text style={localStyles.uploadText}>Прикрепите логотип фирмы</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
        <View style={localStyles.containerButtonsMenuPages}>
          <TouchableOpacity style={Style.buttonMenuPage} onPress={() => navigation.replace("Firms")}>
            <Text style={Style.blackText}>Закончить регистрацию</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.buttonBackMenuPage, {marginTop:10}]} onPress={() => navigation.replace("Firms")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={Style.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1 },
  centeredContainer: {
    marginTop: 15,
    flex: 0.9,                  
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  transparentContainer: {
    backgroundColor: 'transparent', 
    borderWidth: 2,              
    borderColor: '#FFFFFF',           
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,            
    padding: 10,                   
    width: '90%',                   
    height: 150,                    
    alignItems: 'center',           
    justifyContent: 'center',       
  },
  fields: { width: "100%" },
  uploadBox: {
    width: "90%",        
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconText: { fontSize: 20, color: "#3A7AFE" },
  uploadText: { color: "#FFFFFF", fontSize: 16, textAlign: "center" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  containerButtonsMenuPages: {
    marginTop: 10,
    marginBottom: -10,
    alignItems: "center",
    justifyContent: "center",
  },
});
