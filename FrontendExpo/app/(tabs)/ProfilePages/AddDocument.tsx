import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
  Button,Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../../Styles/Style";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddDocument({ navigation }) {

  const [name, setName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedFileUri, setSelectedFileUri] = useState(null);
  const [date, setDate] = useState(new Date()); 
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const pickAndUploadFile = async () => {
    // Выбор файла
    let result;

    try {
      result = await DocumentPicker.getDocumentAsync();
    } catch (error) {
      console.error('Error picking document:', error);
      return;
    }

    if (!result.canceled) {
      setSelectedFileUri(result.assets[0].uri);
      console.log('Selected file:', result.assets[0].uri);
      
    }
  };

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios' ? true : undefined); // Закрыть пикер на iOS
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };


  // const hidePicker = () => {
  //   setShow(false);
  // };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true); // Показываем пикер
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false); // Скрываем пикер
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate); // Устанавливаем выбранную дату
    hideDatePicker(); // Закрываем пикер
  };

  const getFileNameFromUri = (fileUri) => {
    const fileName = fileUri.split('/').pop();
    if (fileName.length > 20) {
      return `...${fileName.slice(-20)}`;
    }
    return fileName;
  };

  const handleInputChange = (text) => {
    setName(text);
  };
  
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesFooterHeader}>
                    <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
                    </View>
                    <View style={styles.menuPagesSecondHeader}>
            <Text style={styles.menuTitle}>Добавить новый документ</Text>
            <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
        </View>
        <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
        </View>
        <View style={localStyles.containerInputBox}>
            <Text  style={[localStyles.textTopInput, { marginBottom: 10 }]}>Название документа</Text>
            <TextInput value={name} onChangeText={handleInputChange} returnKeyType="done" style={styles.textInputProfile} placeholder="Барная лицензия" />
        </View>
        <View style={[styles.switchContainer]}>
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
            <View style={localStyles.inputContainer}>
              <TextInput value={formatDate(date)} returnKeyType="done" style={styles.textInputProfile} placeholder="Мы напомним вам о сроках" />
              <TouchableOpacity style={localStyles.icon}  onPress={showDatePicker} >
                <Icons name="calendar" size={24} color="#000" />
              
                {show && (
                <>
                {/* {Platform.OS === 'ios' && (
                  <TouchableOpacity style={localStyles.doneButton} onPress={hidePicker}>
                    <Text style={localStyles.doneButtonText}>Готово</Text>
                  </TouchableOpacity>
                )} */}
                {/* <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display={Platform.OS === 'ios' ? 'default' : 'default'}
                  onChange={onChange}
                /> */}
                </>
              )}
              </TouchableOpacity>
            </View>
        </View>
        )}
        <View style={localStyles.containerButtonAddFile}>
        <TouchableOpacity style={localStyles.buttonAddFile}  onPress={pickAndUploadFile}>
        { !selectedFileUri &&   <Text style={localStyles.textInButtonAdd}>Прикреепить файл (5 мб)</Text>}
           { selectedFileUri && <Text style={localStyles.textInButtonAdd}>{getFileNameFromUri(selectedFileUri)}</Text>}
        </TouchableOpacity>
        </View>
        <View style={localStyles.containerButtonsMenuPages}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("ChoosePointsDoc", { name:name, isDate:isEnabled, date:date.toISOString(), uri:selectedFileUri })}>
            <Text style={styles.blackText}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Documents")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.DefText}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 18, // Расположение справа
    top: 18,
  },
  doneButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerButtonsMenuPages: {
    width: "100%",
    height: 120,
    justifyContent: 'flex-end',
    flex: 1,
  },
  containerInputBox: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  textTopInput: {
    fontFamily: 'Montserrat',
    fontWeight: "500",
    fontSize: 18,
    color: "#FFFFFF"
  },
  containerButtonAddFile: {
    width: "100%",
    marginTop: 10,
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
