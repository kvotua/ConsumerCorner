import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
  Image,
  Dimensions, 
  Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";

export default function Profile({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { width } = Dimensions.get('window');

  const isTablet = width >= 768;

  const getPaddingVertical = () => {
    if (Platform.OS === 'ios') return isTablet ? 192 : -25; 
    else if (Platform.OS === 'android') return isTablet ? 192 : 25; 
    return 0; 
  };

  const getPaddingHorizontal = () => {
    if (Platform.OS === 'ios') return isTablet ? 192 : 25; 
    else if (Platform.OS === 'android') return isTablet ? 192 : 25; 
    return 0; 
  };




  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={[styles.containerMainPage, { paddingVertical: getPaddingVertical(), paddingHorizontal: getPaddingHorizontal()  }]}>
        <View style={styles.profileHeader}>
        <Image
            source={require("../../../assets/images/profileImage.png")}
            style={localStyles.profileImage} 
          />
          <Text style={styles.profileTitle}>Акулич В.C</Text>
        </View>
        <View style={styles.containerProfile}>
          <Text style={styles.textDescriptionProfile}>Ф.И.О</Text>
          <TextInput style={styles.textInputProfile} placeholder="Акулич Виктор Сергеевич" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 18 }]}>Номер телефона</Text>
          <TextInput style={styles.textInputProfile} placeholder="+79113453221" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 18 }]}>Email</Text>
          <TextInput style={styles.textInputProfile} placeholder="yyyy@mail.ru" />
          
          <Text style={[styles.textDescriptionProfile, { marginTop: 18 }]}>Изменить пароль</Text>
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
        <View style={[styles.containerButtonsMenuPages, { paddingVertical: 0 }]}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsMenuPage}>Вернуться на главную</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100, 
    borderRadius: 50,
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: "#FFFFFF", 
  },
});


