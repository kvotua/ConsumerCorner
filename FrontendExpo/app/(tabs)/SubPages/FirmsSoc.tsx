import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";

export default function FirmsSoc({ navigation }) {

  // Массив с данными, добавлены типы для фирмы и точки
  const data = [
    { id: '1', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12', 'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '2', title: "Название ИП, ИНН", type: 'firm', points: [
      'Точка: Москва, ул. Тверская д. 4'
    ] },
    { id: '3', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '4', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '5', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '6', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '7', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '8', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '9', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '10', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '11', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    
  ];

  // Функция рендеринга каждого элемента
  const renderItem = ({ item }) => {
    if (item.type === 'firm') {
      // Если элемент - фирма, то отображаем название фирмы и при клике переходим на экран с точками
      return (
        <View style={styles.itemFlatList}>
          <Text style={styles.textInFlatList}>{item.title}</Text>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={() => navigation.navigate("Social")}
          >
          </TouchableOpacity>
        </View>
      );
    } else {
      // Если элемент - точка, то просто отображаем точку
      return (
        <View style={localStyles.flatListContainer}>
          <View style={styles.itemFlatList}>
            <Text style={styles.textInFlatList}>{item.title}</Text>
            <View style={styles.circleContainer}>
              <View style={styles.innerCircle} />
            </View>
        </View>
        </View>
      );
    }
  };

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
          <FlatList style={[{ paddingRight: 10 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет фирм/точек</Text>}
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>← Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    alignItems: 'center',
  }
});

