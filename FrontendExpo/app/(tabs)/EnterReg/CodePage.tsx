import React from "react";
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

export default function CodePage({ navigation}) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.header}>
              <Text style={Style.titleHead}>Код подтверждения</Text>
            </View>
            <View style={StyleSheet.flatten([Style.fields, {justifyContent: 'flex-start', }])}>
              <Text style={Style.titleSimple}>
                Введите код подтверждения из SMS - сообщнеия, отправленного на
                номер
              </Text>
              <TextInput
                style={Style.textInputProfile}
                placeholder="Код подтверждения"
              />
              <Text style={StyleSheet.flatten([Style.subtitle, { color:"silver", textAlign: "left", }])}>Код действует еще .. секунд</Text>
            </View>

            <View style={Style.buttons}>
              <TouchableOpacity style={Style.WhiteButton} onPress={() => navigation.replace("Inn")}>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}