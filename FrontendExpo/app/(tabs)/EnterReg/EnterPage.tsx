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
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Enter({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [phoneValue, setPhoneValue] = useState(""); 
  const [rawPhoneValue, setRawPhoneValue] = useState(""); 
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); 
  };
  
  const handleInputChange = (text) => {
    setPhoneValue(text);

    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
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

  const handleFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
                  {toast.visible && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    subMessage={toast.subMessage}
                    visible={toast.visible}
                    onDismiss={() => setToast({ ...toast, visible: false })}
                />
                )}
            <View style={[Style.menuHeader, {alignItems: "center",}]}>
              <Text style={StyleSheet.flatten([Style.titleHead])}>Вход</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Номер телефона</Text>
              <TextInputMask
                returnKeyType="done"
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99",
                }}
                value={phoneValue}
                returnKeyType="done"
                onChangeText={handleInputChange}
                keyboardType="phone-pad"
                style={Style.textInputProfile}
                placeholder="+7 (999) 999-99-99"
                onFocus={handleFocus}
              />
              
                <Text style={Style.titleSimple}>Пароль</Text>

                <TextInput
                  returnKeyType="done"
                  style={Style.textInputProfile}
                  value={password}
                  returnKeyType="done"
                  onChangeText={setPassword}
                  secureTextEntry={isSecure}
                  placeholder="Пароль"
                />
                <TouchableOpacity>
                  <Text style={StyleSheet.flatten([Style.subtitle, {color:"silver", marginTop: 4}])}>Восстановить пароль</Text>
                </TouchableOpacity>
            </View>
            <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
                <TouchableOpacity
                    style={Style.buttonMenuPage}
                    onPress={SendtoServer}
                >
                    <Text style={Style.blackText} >Далее</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Start")}>
                    <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
