import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";

export default function AddDocument({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesSecondHeader}>
            <Text style={styles.menuTitle}>Добавить новый документ</Text>
        </View>
        <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
        </View>
        <View style={localStyles.containerInputBox}>
            <Text style={[localStyles.textTopInput, { marginBottom: 10 }]}>Название документа</Text>
            <TextInput style={styles.textInputProfile} placeholder="Барная лицензия" />
        </View>
        <View style={[styles.switchContainer, { marginTop: 28 }]}>
            <Text style={styles.switchText}>Документ имеет срок годности</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
              trackColor={{ false: "#7B9DF2", true: "#7B9DF2" }}
              thumbColor={isEnabled ? "#E6E6E6" : "#E6E6E6"}
              />  
        </View>
        {isEnabled && (
          <View style={localStyles.containerInputBox}>
            <Text style={[localStyles.textTopInput, { marginBottom: 10 }]}>Укажите дату окончания действия документа</Text>
            <TextInput style={styles.textInputProfile} placeholder="Мы напомним вам о сроках" />
        </View>
        )}
        <View style={localStyles.containerButtonAddFile}>
        <TouchableOpacity style={localStyles.buttonAddFile} onPress={() => navigation.replace("Profile")}>
            <Text style={localStyles.textInButtonAdd}>Прикреепить файл (5 мб)</Text>
        </TouchableOpacity>
        </View>
        <View style={localStyles.containerButtonsMenuPages}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Documents")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.textInButtonsBackMenuPage}>←Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  containerButtonsMenuPages: {
    width: "100%",
    height: 120,
    justifyContent: 'flex-end',
    flex: 1,
  },
  containerInputBox: {
    width: "100%",
    marginTop: 28,
  },
  textTopInput: {
    fontFamily: 'Montserrat',
    fontWeight: "500",
    fontSize: 18,
    color: "#FFFFFF"
  },
  containerButtonAddFile: {
    width: "100%",
    marginTop: 42,
  },
  buttonAddFile: {
    width: 228,
    height: 45,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInButtonAdd: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});
