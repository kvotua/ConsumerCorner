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
  Platform,
  FlatList
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

  // Данные для FlatList
  const inputData = [
    { id: '1', label: 'Ф.И.О', placeholder: 'Акулич Виктор Сергеевич', isSwitch: false },
    { id: '2', label: 'Номер телефона', placeholder: '+79113453221', isSwitch: false },
    { id: '3', label: 'Email', placeholder: 'yyyy@mail.ru', isSwitch: false },
    { id: '4', label: 'Изменить пароль', placeholder: '************', isSwitch: false },
    { id: '5', label: 'Получать отзывы в Telegram', isSwitch: true }, // Новый элемент для переключателя
  ];

  // Функция рендеринга каждого элемента FlatList
  const renderInputItem = ({ item }) => (
    <View style={{ marginBottom: 18, flexDirection: item.isSwitch ? 'row' : 'column', alignItems: item.isSwitch ? 'center' : 'flex-start' }}>
      <Text style={styles.textDescriptionProfile}>{item.label}</Text>
      {item.isSwitch ? (
        <Switch 
          style={[{ transform: isTablet ? [{ scale: 1 }] : [{ scale: 1 }] }, { marginStart: "auto" }]} // Добавляем отступ слева
          onValueChange={toggleSwitch}
          value={isEnabled}
          trackColor={{ false: "#7B9DF2", true: "#7B9DF2" }}
          thumbColor={isEnabled ? "#E6E6E6" : "#E6E6E6"}
        />
      ) : (
        <TextInput style={styles.textInputProfile} placeholder={item.placeholder} />
      )}
    </View>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={[styles.containerMainPage, { paddingVertical: getPaddingVertical(), paddingHorizontal: getPaddingHorizontal() }]}>
        <View style={styles.profileHeader}>
          <Image
            source={require("../../../assets/images/profileImage.png")}
            style={localStyles.profileImage} 
          />
          <Text style={styles.profileTitle}>Акулич В.C</Text>
        </View>
        
        <View style={styles.containerProfile}>
          <FlatList
            data={inputData}
            renderItem={renderInputItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={localStyles.containerButtonsBottomFlatList}>
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
  containerButtonsBottomFlatList: {
  width: "100%",
  height: 45,  
 justifyContent: 'flex-end', 
},
});
