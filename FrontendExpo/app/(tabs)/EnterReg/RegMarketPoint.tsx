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
import { RegNewPointServer } from "@/Api/RegNewPointRoot";
import * as ImagePicker from "expo-image-picker";
import IconImg from '../../../assets/images/svg/Icon.svg';

export default function MarketPoint({ navigation }) {
  const [Start, setValue] = useState();
  const [End, setValue2] = useState();
  const [Name, setName] = useState();
  const [phoneValue, setPhoneValue] = useState(""); 
  const [Adress, setAdress] = useState(""); 
  const [rawPhoneValue, setRawPhoneValue] = useState("");
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
  

  const handleInputPhone = (text) => {
    // Устанавливаем значение с маской для отображения
    setPhoneValue(text);

    // Извлекаем только цифры из введенного значения
    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
    console.log(numericValue)
  };

  const handleFocus = () => {
    // Устанавливаем маску при первом фокусе
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };

  const handleInputChange = (text) => {
    setValue(text);
  };
  const handleInputChange2 = (text) => {
    setValue2(text);
  };
  const handleInputName = (text) => {
    setName(text);
  };
  const handleInputChangeAdress2 = (text) => {
    setAdress(text);
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
                onChangeText={handleInputChangeAdress2}
                value={Adress}
                placeholder="ул. Пушкина дом Победы 32"
              />

              <Text style={Style.titleSimple}>Телефон администратора точки</Text>

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99", // Маска
                }}
                value={phoneValue} // Значение с маской
                onChangeText={handleInputPhone} // Обработчик изменения текста
                keyboardType="phone-pad"
                style={Style.textInputProfile}
                placeholder="+7 (999) 999-99-99"
                onFocus={handleFocus} // Устанавливаем шаблон при фокусе
              />

              <Text style={Style.titleSimple}>Рабочее название магазина</Text>
              <View style={Style.passwordContainer}>
                <TextInput
                    style={Style.textInputProfile}
                    onChangeText={handleInputName}
                    value={Name}
                    placeholder="Пироги"
                />
              </View>

              <Text style={Style.titleSimple}>Открытие точки</Text>
              <TextInputMask
                type={"custom"}
                 options={{
                  mask: "99:99",
                   }}
                   value={Start}
                   onChangeText={handleInputChange}
               style={StyleSheet.flatten([Style.textInputProfile, {width:"30%"}])} keyboardType="phone-pad" placeholder="11:00" />

              <Text style={Style.titleSimple}>Закрытие точки</Text>
              <TextInputMask 
                type={"custom"}
                options={{
                  mask: "99:99",
                  }}
                  value={End}
                  onChangeText={handleInputChange2}
              style={StyleSheet.flatten([Style.textInputProfile, {width:"30%"}])} keyboardType="phone-pad" placeholder="22:00" />
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

            <View style={[Style.containerButtonsMenuPages]}>
              <TouchableOpacity style={Style.buttonMenuPage} onPress={() => RegNewPointServer(Name, Adress, Start, End, rawPhoneValue)}>
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


const localStyles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1 },
  centeredContainer: {
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconText: { fontSize: 20, color: "#3A7AFE" },
  uploadText: { color: "#FFFFFF", fontSize: 16, textAlign: "center" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  containerButtonsMenuPages: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
