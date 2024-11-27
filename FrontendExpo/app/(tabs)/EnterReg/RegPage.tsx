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
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from 'react-native-vector-icons/Feather';

export default function RegPage({ navigation }) {
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [value, setValue] = useState("+7 ");


  const handleInputChange = (text : string) => {
    if (!text.startsWith("+7 ")) {
      text = "+7 " + text.replace("+7 ", "");
    }
    setValue(text);
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.header}>
              <Text style={Style.titleHead}>Регистрация</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Телефон</Text>

              <TextInputMask
                  type={"custom"}
                  options={{
                    mask: "+9 (999) 999-99-99",
                  }}
                  value={value}
                  onChangeText={handleInputChange}
                  keyboardType="phone-pad"
                  style={Style.textInputProfile}
                  placeholder="+7 (999) 999-99-99"
                />

              <Text style={Style.titleSimple}>Пароль</Text>
              <View style={Style.passwordContainer}>
                <TextInput
                  style={Style.textInputProfile}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecure}
                  placeholder="Пароль"
                />
                <TouchableOpacity
                  onPress={toggleSecureTextEntry}
                  style={Style.iconButton}
                >
                  <Icon name={isSecure ? 'eye-off' : 'eye'} size={24} color="#00000" />
                </TouchableOpacity>
              </View>

              <Text style={Style.titleSimple}>Ф.И.О</Text>
              <TextInput style={Style.textInputProfile} placeholder="Ф.И.О" />
            </View>

            <View style={Style.buttons}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() =>
                  navigation.replace("CodeConfirm")
                }
              >
                <Text style={Style.blackText}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Start")}>
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}