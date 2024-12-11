import React, {useState} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,KeyboardAvoidingView, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Style from "../../Styles/Style";
import { TextInputMask } from "react-native-masked-text";
import Toast from "../Notif/toasts/Toast";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InnReg({navigation}){
    const [value, setValue] = useState("");
    const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });


    const handleInputChange = (text : string) => {
      setValue(text);
    };

    const showToast = (type :string, message:string, subMessage:string) => {
        setToast({ type, message, subMessage, visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
      };
    

    
    const handleNext = async () => {
        let inn = value.replace(/\s/g, "")
        if(!inn ||( inn.length != 10 && inn.length != 12)){
            showToast("error", "Ошибка!", "Неверная длина ИНН");
            return
        }
        if (/[a-zA-Zа-яА-Я]/.test(inn)) {
            showToast("error", "Ошибка!", "ИНН должен содержать только цифры");
            return
        }
        if (isNaN(inn)) {
            showToast("error", "Ошибка!", "ИНН должен содержать только цифры");
            return
        }
        await AsyncStorage.setItem("Inn", inn)
        const url = `http://localhost:8765/inn/inn_info?inn=${inn}`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Accept": "application/json",
            },
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка сервера");
          }
    
          const data = await response.json();
          await AsyncStorage.setItem("TypeFirm", data.type)
          navigation.replace("RegFirma", { companyData: data });
        } catch (error) {
          showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
        }
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
                    onDismiss={() => setToast({ ...toast, visible: false })} // Здесь важно передать функцию
                />
                )}
            <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
                <View style={StyleSheet.flatten([Style.containerLine])}>
                    <View style={StyleSheet.flatten([Style.header, {alignSelf: "flex-start",}])}>
                        <Text style={([Style.titleHead])}>Введите ИНН</Text>
                    </View>
                    <View style={Style.menuPagesLine}/>
                </View>
                <View style={StyleSheet.flatten([Style.fields, {justifyContent: 'flex-start'}])}>
                    <Text style={StyleSheet.flatten([Style.subtitle, {fontSize: 16, color: "#FFFFFF", marginTop: 10}])}>ИНН юридического лица</Text>
                    <TextInputMask
                    type={"custom"}
                    options={{
                    mask: "999 999 999 999",
                    }}
                    value={value}
                    onChangeText={handleInputChange}
                    // keyboardType="phone-pad"
                    style={Style.textInputProfile}
                    placeholder="255 055 034 235"
                    />
                </View>
                <View style={localStyles.buttons}>
                        <TouchableOpacity style={localStyles.WhiteButton} onPress={() => handleNext()}>
                        <Text style={[Style.blackText, { fontSize: 18 }]}>Далее</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>

    );
};

const localStyles = StyleSheet.create({
    WhiteButton: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'flex-end'
      },
      buttons: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        justifyContent: 'flex-end'
      },
  });