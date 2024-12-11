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
import Toast from "../Notif/toasts/Toast";
import { AccessGetToken, SesIdToken } from "@/app/AsyncStore/StoreTokens";

export default function CodePage({ navigation}) {
    const [code, setcode] = useState("");
    const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

    const handleInputChange = (text) => {
      setcode(text);
    };

    const showToast = (type :string, message:string, subMessage:string) => {
      setToast({ type, message, subMessage, visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 3000); 
    };
    
    const handleNext = async () => {
      const token = await AccessGetToken();
      const ses = await SesIdToken();
      navigation.replace("MenuPage")
      const url = 'http://localhost:8765/auth/check';
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
          throw new Error(errorData.message || "Неверный код");
        }
  
        const data = await response.json();
      } catch (error) {
        showToast("error", "Ошибка!", error.message || "Неверный код");
      }
    };
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={[Style.containerMainPage]}>
          {toast.visible && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        subMessage={toast.subMessage}
                        visible={toast.visible}
                        onDismiss={() => setToast({ ...toast, visible: false })}
                    />
                    )}
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
              <TouchableOpacity style={Style.WhiteButton} onPress={() => handleNext()} disabled={code.trim() === ""}>
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
