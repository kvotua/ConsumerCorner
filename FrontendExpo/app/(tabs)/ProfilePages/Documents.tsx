import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList, 
  StyleSheet
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";

export default function Documents({ navigation }) {

  const data = [
    { id: '1', title: "Лицензия 1" },
    { id: '2', title: "Лицензия 1" },
    { id: '3', title: 'Лицензия 1' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
  ];
  
    // Функция рендеринга каждого элемента
  const renderItem = ({ item }) => (
      <View style={styles.documentsItemFlatList}>
        <TouchableOpacity style={localStyles.button}>
            <Text style={localStyles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={localStyles.textBottomButton}>удалить/заменить</Text>
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
            <Text style={styles.menuTitle}>Документы</Text>
            </View>
            <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
            </View>
      <View style={localStyles.flatListContainer}>
        <FlatList style={[{ paddingRight: 10, }]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>Нет фирм/точек</Text>}
          indicatorStyle="white"
        />
      </View>
        <View style={styles.containerButtonsMenuPages}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    height: "60%",
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
  textBottomButton: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'Montserrat',
    color: "#FFFFFF",
    marginTop: 12,
    alignSelf: 'flex-start', 
  },
});