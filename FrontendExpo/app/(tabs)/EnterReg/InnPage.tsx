import React, {useState} from 'react';
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Style from "../../Styles/Style";
import { TextInputMask } from "react-native-masked-text";

export default function InnReg({navigation}){
    const [value, setValue] = useState();


    const handleInputChange = (text : string) => {
      setValue(text);
    };
    return (
        <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
            <SafeAreaView style={Style.container}>
                <View style={StyleSheet.flatten([Style.containerLine, {left: "-7%"}])}>
                    <View style={StyleSheet.flatten([Style.header, {left: "-13%"}])}>
                        <Text style={([Style.titleHead])}>Введите ИНН</Text>
                    </View>
                    <View style={Style.menuPagesLine}/>
                </View>
                <View style={StyleSheet.flatten([Style.fields, {top:"-30%"}])}>
                    <Text style={StyleSheet.flatten([Style.subtitle, {fontSize: 16, color: "#FFFFFF", right: "18%",}])}>ИНН юридического лица</Text>
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
                <View style={Style.buttons}>
                        <TouchableOpacity style={Style.WhiteButton} onPress={() => navigation.replace("RegFirma")}>
                        <Text style={Style.blackText}>Далее</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>

    );
};