import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Style from "../../Styles/Style"

export default function CodePage({ navigation}) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.header}>
              <Text style={Style.title}>Код подтверждения</Text>
            </View>
            <View style={Style.fields}>
              <Text style={Style.titleSimple}>
                Введите код подтверждения из SMS - сообщнеия, отправленного на
                номер
              </Text>
              <TextInput
                style={Style.TextField}
                placeholder="Код подтверждения"
              />
              <Text style={StyleSheet.flatten([Style.subtitle, {marginLeft: "-45%", color:"silver", marginTop: -10,}])}>Код действует еще .. секунд</Text>
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