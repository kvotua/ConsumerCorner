import React, { useState } from "react";
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
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from 'react-native-vector-icons/Feather';
import Share from "../../../assets/images/svg/share.svg"

export default function RegFirma({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={Style.headerLeft}>
              <Text style={Style.title}>Зарегистрируйте </Text>
              <Text style={styles.title}>фирму</Text>
            </View>
          <ScrollView contentContainerStyle={Style.scrollContainer}>
            <View style={Style.fields}>
              <Text style={styles.titleSimple}>Название фирмы</Text>

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "408 02 810 5 0000 1846336",
                }}
                keyboardType="phone-pad"
                style={Style.TextField}
                placeholder="408 02 810 5 0000 1846336"
              />

              <Text style={styles.titleSimple}>ОГРН юридического лица</Text>
              <View style={styles.passwordContainer}>
                <TextInputMask
                    type={"custom"}
                    options={{
                    mask: "1147847423899",
                    }}
                    keyboardType="phone-pad"
                    style={Style.TextField}
                    placeholder="1147847423899"
                />
              </View>

              <Text style={styles.titleSimple}>Фактический адресс</Text>
              <TextInput style={Style.TextField} placeholder="ул. Павлика Морозова 74Б" />

              <Text style={styles.titleSimple}>Основной вид деятельности</Text>
              <TextInput style={Style.TextField} placeholder="Частное предприятие" />
            </View>
            <View style={Style.passwordContainer}>
            <Text style={styles.titleSimple2}>Пригласите партнеров и</Text>
                    <Text style={styles.titleSimple2}>собственников бизнеса</Text>
                    <TextInput style={styles.TextField}/>
                    <TouchableOpacity //кнопка копирования
                    style={StyleSheet.flatten([Style.iconButton, {right:45, top:59}])}
                    >
                    <Icon name={'copy'} size={24} color="#00000" />
                  </TouchableOpacity>
                  <TouchableOpacity //кнопка копирования
                    style={StyleSheet.flatten([Style.iconButton, {right:5,  top:58}])}
                    >
                    <Share/>
                  </TouchableOpacity>
            </View>

            <View style={StyleSheet.flatten([Style.buttons, {marginTop:-5}])}>
              <TouchableOpacity
                style={Style.WhiteButton}
                onPress={() =>
                  navigation.replace("CodeConfirm")
                }
              >
                <Text style={Style.blackText} onPress={() => navigation.replace("MarketInfo")}>Далее</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.DefButton} onPress={() => navigation.replace("Inn")}>
                <Text style={Style.DefText}>Назад</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    alignItems: "flex-start",
    marginTop: -50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSimple: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  titleSimple2: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 3,
    alignSelf: "flex-start",
  },
  passwordContainer: {
    position: "relative",
    width: 350,
    marginBottom: 15,
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "right",
    marginBottom: 10,
    textDecorationLine: "none"
  },
  TextField: {
    width: 350,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
    paddingLeft: 10,
  },
});
