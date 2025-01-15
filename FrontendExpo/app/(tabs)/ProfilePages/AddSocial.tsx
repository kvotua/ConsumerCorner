import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Toast from "../Notif/toasts/Toast";
import { handleNext, SendNumber } from "@/Api/EnterRoot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import { decodeJwt } from "@/app/AsyncStore/Decode";

export default function newSocial({ navigation }) {
  const [password, setPassword] = useState("");
  const [SocValue, setSocValue] = useState(""); 
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); 
  };
  
  const handleInputChange = (text) => {
    setSocValue(text);
  };

  const SendtoServer = async () =>{
    try {
      const data = await handleNext(rawPhoneValue, password)

      if(data.message == "Input should be a valid dictionary or object to extract fields from")
        showToast("error", "Ошибка!", data.message || "Неверный логин или пароль");
      await AsyncStorage.setItem("access_token", data.access_token);
      await AsyncStorage.setItem("refresh_token", data.refresh_token);
      try {
        const token = await AccessGetToken()
        const decodeToken =  decodeJwt(token);
        if(decodeToken.verify_phone != false)
          navigation.replace("MenuPage");
        else{
          const token = await AccessGetToken();
          await SendNumber(token);
          navigation.replace("CodeConfirmEnt");
        }

      } catch (error) {
        console.log(error.message)
      }
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
    }
    
  }
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
          <View style={Style.firmsAndPointsHeader}>
            <Text style={Style.menuTitle}>Мои точки</Text>
          </View>
          <View style={Style.containerLine}>
            <View style={Style.menuPagesLine} />
          </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Название соц.сети</Text>

              <TextInput
                value={SocValue}
                onChangeText={handleInputChange}
                style={Style.textInputProfile}
                placeholder="vk - Алябьева 39"
              />
                <Text style={Style.titleSimple}>Вставьте ссылку на соц.сеть</Text>

                <TextInput
                  style={Style.textInputProfile}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="http//.."
                />
            </View>
            <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
                <TouchableOpacity
                    style={Style.buttonMenuPage}
                    onPress={() => navigation.replace("Social")}
                >
                    <Text style={Style.blackText} >Добавить соц.сеть</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Social")}>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
