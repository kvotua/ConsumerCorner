import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from 'react-native-vector-icons/Feather';
import Icons from "react-native-vector-icons/Feather";
import Toast from "../Notif/toasts/Toast";
import { apiRequest } from '../../../Api/RefreshToken';

export default function AddNewAdmin({ navigation }) {
  const [fio, setfio] = useState("");
  const [password, setPassword] = useState("");
  const [phoneValue, setPhoneValue] = useState(""); 
  const [rawPhoneValue, setRawPhoneValue] = useState("");
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const handleInputChange = (text) => {
    setPhoneValue(text);

    const numericValue = text.replace(/\D/g, ""); 
    setRawPhoneValue(numericValue);
    console.log(numericValue)
  };

  const handleFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7 () - - -");
    }
  };


//   const handleNext = async () => {  
//     const url = 'http://localhost:8765/registration';
  
//     try {
//       // Выполняем POST-запрос через универсальную функцию
//       const data = await apiRequest(
//         url,
//         "POST",
//         {
//           phone: rawPhoneValue,
//           fio: fio,
//           password: password,
//         },
//         {
//           "Content-Type": "application/json",
//         }
//       );
  
//       // Навигация на следующий экран
//       navigation.replace("CodeConfirm");
//     } catch (error) {
//       // Обработка ошибки
//       showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
//     }
//   };

  const showToast = (type :string, message:string, subMessage:string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
                        {/* Компонент Toast */}
                  {toast.visible && (
                <Toast 
                    type={toast.type}
                    message={toast.message}
                    subMessage={toast.subMessage}
                    visible={toast.visible}
                    onDismiss={() => setToast({ ...toast, visible: false })} 
                />
                )}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={StyleSheet.flatten([Style.containerLine, {paddingEnd: "uset"}])}>
                <View style={StyleSheet.flatten([Style.header, {alignSelf: "flex-start",}])}>
                    <Text style={([Style.titleHead, {textAlign: "unset", }])}>Добавить администратора</Text>
                </View>
                <View style={Style.menuPagesLine}/>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>ФИО сотрудника или партнера</Text>

              <TextInput
                value={phoneValue}
                style={Style.textInputProfile}
                placeholder="+7 (999) 999-99-99"
              />

              <Text style={Style.titleSimple}>Номер телефона</Text>
              <TextInputMask
                type={"custom"}
                options={{
                  mask: "+7 (999) 999-99-99",
                }}
                value={phoneValue}
                onChangeText={handleInputChange}
                keyboardType="phone-pad"
                style={Style.textInputProfile}
                placeholder="+7 (999) 999-99-99"
                onFocus={handleFocus}
              />
              <Text style={Style.titleSimple}>На указанный Вами номер телефона будет отправлена авторизационная ссылка</Text>
              <Text style={Style.titleSimple}>Выберите роль</Text>
              <TextInput style={Style.textInputProfile} placeholder="Администратор . партнер" autoCapitalize="words" onChangeText={setfio}/>
            </View>

            <View style={[Style.buttons, {paddingVertical: -10,}]}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() => {
                  navigation.replace("AssignmentPointFirm");
                }}
              >
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("MenuPage")}>
                <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}