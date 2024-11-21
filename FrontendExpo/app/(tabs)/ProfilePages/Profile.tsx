import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import styles from "../../Styles/Style";

export default function Profile({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>Акулич В.C</Text>
        </View>
        <View style={styles.containerProfile}>
          <Text style={styles.textDescriptionProfile}>Ф.И.О</Text>
          <TextInput style={styles.textInputProfile} placeholder="ул. Павлика Морозова 74Б" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 41 }]}>Номер телефона</Text>
          <TextInput style={styles.textInputProfile} placeholder="+79113453221" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 41 }]}>Email</Text>
          <TextInput style={styles.textInputProfile} placeholder="yyyy@mail.ru" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 41 }]}>Изменить пароль</Text>
          <TextInput style={styles.textInputProfile} placeholder="************" />
        </View>
        <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Получать отзывы в Telegram</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
              trackColor={{ false: "#7B9DF2", true: "#7B9DF2" }}
              thumbColor={isEnabled ? "#E6E6E6" : "#E6E6E6"}
              />  
        </View>
        <View style={[styles.containerButtonsMenuPages, { paddingVertical: 0, marginBottom: 39 }]}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsMenuPage}>Вернуться на главную</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}


