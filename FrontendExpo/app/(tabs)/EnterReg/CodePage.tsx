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
import Icons from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CodePage({ navigation }) {
  const [code, setcode] = useState("");
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const handleInputChange = (text) => {
    setcode(text);
  };

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const handleNext = async () => {
    try {
      const token = await AccessGetToken();
      const ses = await SesIdToken();
      console.log(token)

      const payload = {
        req_id: ses,
        code: code,
      }


      const data = await fetch('https://consumer-corner.kvotua.ru/verify/phone/check', {
        method: "POST",
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const res2 = await data.json();
      if (res2.detail && (res2.detail.message || res2.detail.phone)) {
        await AsyncStorage.setItem('access_token', res2.access_token);

        // Если успешный запрос, переходим на следующий экран
        navigation.replace("Inn", { from: 'reg' });
      } else {
        const errorMessages: { [key: string]: string } = {
          "Invalid ID or code": "Неверный код!",
        };

        const text = errorMessages[res2.detail as keyof typeof errorMessages] || res2.detail || "Неизвестная ошибка";
        showToast("error", "Ошибка!", text);
      }
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
        <View style={[Style.menuHeader, { alignItems: "center", marginTop: 40, }]}>
          <Text style={Style.titleHead}>Код подтверждения</Text>
        </View>
        <View style={StyleSheet.flatten([Style.fields, { marginTop: 20 }])}>
          <Text style={Style.titleSimple}>
            Введите последние 4 цифры входящего номера телефона, звонок поступит на номер +7 (961) ХХХ ХХ 36
          </Text>
          <TextInput
            returnKeyType="done"
            style={[Style.textInputProfile, { marginTop: 10 }]}
            returnKeyType="done"
            keyboardType="phone-pad"
            onChangeText={handleInputChange}
            placeholder="Код подтверждения"
          />
          <Text style={StyleSheet.flatten([Style.subtitle, { color: "silver", marginTop: 4 }])}>Код действует еще .. секунд</Text>
        </View>

        <View style={[Style.buttons]}>
          <TouchableOpacity style={Style.WhiteButton} onPress={() => handleNext()} disabled={code.trim() === ""}>
            <Text style={Style.blackText}>Далее</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Register")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={Style.DefText} >Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function showToast(arg0: string, arg1: string, arg2: any) {
  throw new Error("Function not implemented.");
}
