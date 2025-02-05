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
import Icons from "react-native-vector-icons/Feather";
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

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
          <View style={Style.menuPagesFooterHeader}>
                              <Text style={Style.footerDocumentsText}>уголок потребителя</Text>
                  </View>
                  <View style={Style.menuPagesSecondHeader}>
            <Text style={Style.menuTitle}>Добавить новую 
            соц.сеть</Text>
          </View>
          <View style={Style.containerLine}>
            <View style={Style.menuPagesLine} />
          </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>Название соц.сети</Text>

              <TextInput
                returnKeyType="done"
                value={SocValue}
                onChangeText={handleInputChange}
                style={Style.textInputProfile}
                placeholder="vk - Алябьева 39"
              />
                <Text style={Style.titleSimple}>Вставьте ссылку на соц.сеть</Text>

                <TextInput
                  returnKeyType="done"
                  style={Style.textInputProfile}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="https//.."
                />
            </View>
            <View style={StyleSheet.flatten([Style.containerButtonsMenuPages])}>
                <TouchableOpacity style={Style.buttonMenuPage} onPress={() => navigation.replace("ChoosePoints", { socValue: SocValue, link: password })} >
                    <Text style={Style.blackText} >Добавить соц.сеть</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Social")}>
                    <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
                    <Text style={Style.DefText}>Назад</Text>
                </TouchableOpacity>
                </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
