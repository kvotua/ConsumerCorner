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
import Style from "../../Styles/Style"
import Toast from "../Notif/toasts/Toast";
import { AccessGetToken, SesIdToken } from "@/app/AsyncStore/StoreTokens";
import { apiRequest } from '../../../Api/RefreshToken';

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
    const url = 'http://127.0.0.1:8080/auth/check';
  
    try {
      // Получаем токены из локального хранилища
      const token = await AccessGetToken();
      const ses = await SesIdToken();
  
      // Выполняем запрос с помощью универсальной функции
      const data = await apiRequest(
        url,
        "POST",
        {
          req_id: ses,
          sms_code: code,
        },
        {
          "access-token": token,
        }
      );
  
      // Если успешный запрос, переходим на следующий экран
      navigation.replace("Inn");
    } catch (error) {
      // Обрабатываем ошибку и показываем тост
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
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Register")}>
                <Text
                  style={Style.DefText}
                >
                  Назад
                </Text>
              </TouchableOpacity>
            </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function showToast(arg0: string, arg1: string, arg2: any) {
  throw new Error("Function not implemented.");
}
