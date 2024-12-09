import React, { useState } from "react";
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
import Style from "../../Styles/Style"
import { AccessGetToken, SesIdToken } from "@/app/AsyncStore/StoreTokens";

export default function CodePage({ navigation}) {
    const [code, setcode] = useState("");

    const handleInputChange = (text) => {
      setcode(text);
    };
    
    const handleNext = async () => {
      const token = await AccessGetToken();
      const ses = await SesIdToken();
  
      const url = 'http://127.0.0.1:8080/auth/check';
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "access-token" : `${token}`,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ 
            "req_id": `${ses}`,
            "sms_code": `${code}`
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Ошибка сервера");
        }
  
        const data = await response.json();
        navigation.replace("MenuPage")
      } catch (error) {
        showToast("error", "Ошибка!", error.message || "Неверный код");
      }
    };
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={[Style.containerMainPage]}>
            <View style={[Style.menuHeader, {alignItems: "center",  marginTop: 40,}]}>
                <Text style={Style.titleHead}>Код подтверждения</Text>
            </View>
              <View style={StyleSheet.flatten([Style.fields, {marginTop: 20}])}>
                <Text style={Style.titleSimple}>
                  Введите код подтверждения из SMS - сообщнеия, отправленного на
                  номер
                </Text>
                <TextInput
                  style={[Style.textInputProfile, {marginTop: 10}]}
                  keyboardType="phone-pad"
                  onChangeText={handleInputChange}
                  placeholder="Код подтверждения"
                />
                <Text style={StyleSheet.flatten([Style.subtitle, { color:"silver", marginTop: 4}])}>Код действует еще .. секунд</Text>
              </View>

            <View style={[Style.buttons]}>
              <TouchableOpacity style={Style.WhiteButton} onPress={() => handleNext()}>
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
            </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function showToast(arg0: string, arg1: string, arg2: any) {
    throw new Error("Function not implemented.");
}
