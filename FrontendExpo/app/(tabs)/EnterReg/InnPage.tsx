import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Style from "../../Styles/Style";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputMask } from "react-native-masked-text";
import Toast from "../Notif/toasts/Toast";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../../../Api/RefreshToken';

export default function InnReg({ navigation, route }) {
  const { from, inn } = route.params;
  const [value, setValue] = useState(inn ?? "");
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const handleInputChange = (text: string) => {
    setValue(text);
  };

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };



  const handleNext = async () => {
    // Убираем пробелы и проверяем ИНН
    let inn = value.replace(/\s/g, "");
    if (!inn || (inn.length !== 10 && inn.length !== 12)) {
      showToast("error", "Ошибка!", "Неверная длина ИНН");
      return;
    }
    if (/[a-zA-Zа-яА-Я]/.test(inn) || isNaN(inn)) {
      showToast("error", "Ошибка!", "ИНН должен содержать только цифры");
      return;
    }

    // Сохраняем ИНН в локальное хранилище
    await AsyncStorage.setItem("Inn", inn);

    const url = `https://consumer-corner.kvotua.ru/inn/inn_info?inn=${inn}`;

    try {
      // Выполняем GET-запрос через универсальную функцию
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      const res = await data.json();
      if (res.inn) {
        await AsyncStorage.setItem("TypeFirm", data.type);
        navigation.replace("RegFirma", { companyData: res, from: from, inn: inn });
      } else {
        showToast("error", "Ошибка!", "Введите корректный ИНН!");
      }
      // Сохраняем тип компании и переходим на следующий экран
    } catch (error) {
      // Обработка ошибки
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
            <View style={StyleSheet.flatten([Style.header, { alignSelf: "flex-start", }])}>
              <Text style={([Style.titleHead])}>Введите ИНН</Text>
            </View>
            <View style={Style.menuPagesLine} />
          </View>
          <View style={StyleSheet.flatten([Style.fields, { justifyContent: 'flex-start' }])}>
            <Text style={StyleSheet.flatten([Style.subtitle, { fontSize: 16, color: "#FFFFFF", marginTop: 10 }])}>ИНН юридического лица</Text>
            <TextInputMask
              returnKeyType="done"
              type={"custom"}
              options={{
                mask: "999 999 999 999",
              }}
              returnKeyType="done"
              value={value}
              onChangeText={handleInputChange}
              keyboardType="phone-pad"
              style={Style.textInputProfile}
              placeholder="255 055 034 235"
            />
          </View>
          <View style={localStyles.buttons}>
            <TouchableOpacity style={localStyles.WhiteButton} onPress={() => handleNext()}>
              <Text style={[Style.blackText]}>Далее</Text>
            </TouchableOpacity>
            {from === 'login' && (
              <TouchableOpacity style={[Style.buttonBackMenuPage]} onPress={() => navigation.replace("Firms")}>
                <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            )}
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