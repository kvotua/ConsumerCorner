import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";

export default function Firms({ navigation }) {

  const data = [
    { id: '1', title: "Название ООО, ИНН" },
    { id: '2', title: "Название ИП, ИНН" },
    { id: '3', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },
    { id: '9', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },
    { id: '10', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },
    { id: '11', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },
    { id: '12', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В' },

  ];
  
    // Функция рендеринга каждого элемента
    const renderItem = ({ item }) => (
      <View style={styles.itemFlatList}>
        <Text style={styles.textInFlatList}>{item.title}</Text>
        <View style={styles.circleContainer}>
          <View style={styles.innerCircle} />
        </View>
      </View>
    );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.firmsAndPointsHeader}>
          <Text style={styles.menuTitle}>Мои фирмы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine}/>
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>Нет фирм/точек</Text>}
        />
      </View>
      <View style={styles.containerButtonsBottomFlatList}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("Social")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить фирму/точку</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}