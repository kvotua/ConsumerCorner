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

export default function Firms({ navigation }) {

  // Массив с данными, добавлены типы для фирмы и точки
  const data = [
    { id: '1', title: "Название ООО, ИНН", type: 'firm', points: [
      'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В',
      'Точка: Санкт-Петербург, Невский пр., д. 12'
    ] },
    { id: '2', title: "Название ИП, ИНН", type: 'firm', points: [
      'Точка: Москва, ул. Тверская д. 4'
    ] },
    { id: '3', title: 'Точка: Калининград, Калининградская обл, ул. Ленина д. 16 В', type: 'point' },
    { id: '4', title: 'Точка: Санкт-Петербург, Невский пр., д. 12', type: 'point' },
    { id: '5', title: 'Точка: Москва, ул. Тверская д. 4', type: 'point' },
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
            onPress={() => navigation.navigate("Points", { firmId: item.id, points: item.points })}
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
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет фирм/точек</Text>}
            showsVerticalScrollIndicator={false}
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

const localStyles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    alignItems: 'center',
  }
});

