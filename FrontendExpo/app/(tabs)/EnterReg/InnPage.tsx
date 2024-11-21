import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Style from "../../Styles/Style";
import { TextInputMask } from "react-native-masked-text";

export default function InnReg({navigation}){
    return (
        <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
            <SafeAreaView style={Style.container}>
                <View style={Style.header}>
                    <Text style={Style.title}>Введите ИНН</Text>
                </View>
                <View style={Style.fields}>
                    <Text style={StyleSheet.flatten([Style.subtitle, {fontSize: 16, color: "#FFFFFF", marginLeft: "-40%"}])}>ИНН юридического лица</Text>
                    <TextInputMask
                    type={"custom"}
                    options={{
                    mask: "255 055 034 235",
                    }}
                    keyboardType="phone-pad"
                    style={Style.TextField}
                    placeholder="255 055 034 235"
                    />
                </View>
                <View style={Style.buttons}>
                        <TouchableOpacity style={Style.WhiteButton} onPress={() => navigation.replace("RegFirma")}>
                        <Text style={Style.blackText}>Далее</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.DefButton}>
                        <Text
                        style={Style.DefText}
                        onPress={() => navigation.replace("CodeConfirm")}
                        >
                        Назад
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>

    );
};