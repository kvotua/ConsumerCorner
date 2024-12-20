import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons2 from "react-native-vector-icons/Entypo"
import styles from "../../Styles/Style"; // Путь к стилям

export default function Social({ navigation}) {
  const [data, setData] = useState([
    { id: '1', title: "Яндекс" },
    { id: '2', title: "Telegram" },
    { id: '3', title: 'ВКонтакте' },
    { id: '4', title: 'Instagram' },
    { id: '5', title: 'Facebook' },
    { id: '6', title: 'Twitter' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [socialName, setSocialName] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddSocialNetwork = () => {
    console.log(`Добавлена соц. сеть: ${socialName}`);
    setModalVisible(false); // Закрываем модальное окно
    setSocialName(''); // Очищаем поле ввода
  };

  const renderItem = ({ item }) => (
    <View style={styles.socialItemFlatList}>
      <TouchableOpacity 
        style={localStyles.button} 
        onPress={() => navigation.navigate("AllPointsSoc", { social: item.title })}
      >
        <Text style={localStyles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesFooterHeader}>
          <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesHeader}>
          <Text style={styles.menuTitle}>ИП Акулич В.С</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Социальные сети</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={localStyles.flatListContainer}>
          <FlatList style={[{ paddingRight: 10, }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет соц.сетей</Text>}
            indicatorStyle="white"
          />
        </View>

        <View style={[styles.containerButtonsBottomFlatList, { height: 100 }]}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={toggleModal}>
            <Text style={styles.textInButtonsMenuPage}>Добавить соц.сеть</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBackMenuPage, { marginTop: 10 }]}
            onPress={() => navigation.replace("FirmsSoc")}
          >
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>

        {/* Модальное окно */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={localStyles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={localStyles.closeButton}
                onPress={toggleModal}
              >
                <Icons name="x" size={32} color="#5A7BCB"/>
              </TouchableOpacity>
              <Text style={localStyles.modalTitle}>Добавление ссылки</Text>
              <View style={localStyles.containerIcons}>
                <Icon name="telegram" size={40} color="blue" /> 
                <Icons name="globe" size={40} color="blue" /> 
                <Icon name="whatsapp" size={40} color="blue" /> 
                <Icons2 name="vk-with-circle" size={40} color="blue" />

              </View>
              <Text style={[{textAlign: "left", width: "100%", color: "#1644B5", fontSize: 18, marginTop: 8}]}>URL</Text>
              <TextInput
                style={localStyles.modalInput}
                placeholder="Введите название соц.сети"
                value={socialName}
                onChangeText={setSocialName}
              />
              <Text style={[{textAlign: "left", width: "100%", color: "#1644B5", fontSize: 18, marginTop: 8}]}>Пометка</Text>
              <TextInput
                style={localStyles.modalInput}
                placeholder=""
                value={socialName}
                onChangeText={setSocialName}
              />
              {/* <TouchableOpacity
                style={[localStyles.modalButton, { borderColor: "#D43538" }]}
                onPress={handleAddSocialNetwork}
              >
                <Text style={[localStyles.textInButton, { color: "#D43538" }]}>Удалить соц.сеть</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[localStyles.modalButton, { borderColor: '#3563D4' }]}
                onPress={toggleModal}
              >
                <Text style={[localStyles.textInButton, { color: "#3563D4" }]}>Готово</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  containerIcons: {
    width: "100%",
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3563D4"
  },
  modalInput: {
      width: "100%",
      height: 60,
      alignItems: "flex-start",
      backgroundColor: "#FFFFFF",
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: "#3A6CE9",
      borderWidth: 1,
      marginTop:12,
      fontSize: 12,
      color: "rgba(22, 68, 181, 0.5)",
      paddingStart: 15,
  },
  modalButton: {
    width: "100%",
    height: 60,
    padding: 10,
    borderColor: "#BA1737",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textInButton: {
    fontFamily: "Montserrat", 
    fontSize: 15,
    fontWeight: "bold",
  },
  flatListContainer: {
    flex: 1,
    marginBottom: 32,
  },
  button: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    marginTop: 34,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: "bold"
  },
  closeButton: {
    position: "absolute",
    top: 14,
    left: 16,
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#3563D4",
  },
  containerButtonsMenuPages: {
    width: "100%",
    height: 120,
    justifyContent: 'flex-end',
  },
});
