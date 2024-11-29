import React, {useState} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,KeyboardAvoidingView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Style from "../../Styles/Style";
import { TextInputMask } from "react-native-masked-text";

export default function InnReg({navigation}){
    const [value, setValue] = useState();


    const handleInputChange = (text : string) => {
      setValue(text);
    };
    return (
        <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
            <SafeAreaView style={Style.containerMainPage}>
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
                    keyboardType="phone-pad"
                    style={Style.textInputProfile}
                    placeholder="255 055 034 235"
                    />
                </View>
                <View style={localStyles.buttons}>
                        <TouchableOpacity style={localStyles.WhiteButton} onPress={() => navigation.replace("RegFirma")}>
                        <Text style={Style.blackText}>Далее</Text>
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