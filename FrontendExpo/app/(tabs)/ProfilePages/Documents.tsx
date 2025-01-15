import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList, 
  StyleSheet,
  Image
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";

const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

export default function Documents({ navigation }) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [data, setData] = useState([    { id: '1', title: "Лицензия 1" },
    { id: '2', title: "Лицензия 1" },
    { id: '3', title: 'Лицензия 1' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },])

  const baseCards = [
    { id: 1, logo: "", text: "ПК ПОНАРТ" },
    { id: 2, logo: "", text: "ПК2 ПОНАРТ" },
    { id: 3, logo: "", text: "ПК3 ПОНАРТ" },
    { id: 4, logo: "", text: "ПК4 ПОНАРТ" },
  ];

  const [cards, setCards] = useState([...baseCards, ...baseCards]);
  

  const onEndReached = () => {
    setCards((prevCards) => [...prevCards, ...baseCards]);
  };

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0];
      const { index, item } = firstVisibleItem;
  
      const isItemFullyVisible = firstVisibleItem.isViewable && firstVisibleItem.index === index;
  
      if (isItemFullyVisible) {
      
        setVisibleIndex(index);
      } else {
        setVisibleIndex(-1); 
      }
    }
  };
  
  
  const Card = ({ logo, text, isHighlighted }) => {
    return (
      <View
        style={[
          styles2.card,
          isHighlighted && styles2.highlightedCard,
        ]}
      >
        <View style={styles2.logoContainer}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles2.logo} />
          ) : (
            <Text style={styles2.placeholderText}>A</Text>
          )}
        </View>
        <Text style={styles2.text}>{text}</Text>
      </View>
    );
  };
  
    // Функция рендеринга каждого элемента
  const renderItem = ({ item }) => (
      <View style={styles.documentsItemFlatList}>
        <TouchableOpacity style={localStyles.button}>
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
            <Text style={styles.menuTitle}>Документы</Text>
            </View>
            <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
            </View>
      <View style={localStyles.flatListContainer}>
      <FlatList
          data={cards}
          horizontal
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <Card logo={item.logo} text={item.text} isHighlighted={index === visibleIndex} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles2.flatListContent,
            { justifyContent: visibleIndex === 0 ? 'center' : 'flex-start' },
          ]}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig} // Передаем заранее созданный объект
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          snapToInterval={10}
          decelerationRate="fast"
        />
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine}/>
        </View>
        <FlatList style={[{ paddingRight: 10}]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>Нет фирм/точек</Text>}
          indicatorStyle="white"
        />
      </View>
        <View style={styles.containerButtonsBottomFlatList}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    marginTop: 20,
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


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
  },
  flatList: {
    width: '100%',
    paddingLeft: 20
  },
  flatListContent: {
      alignItems: "center",
    },
  card: {
    backgroundColor: "#d6e4ff",
    borderRadius: 8,
    width: 100,
    height: 140,
    marginHorizontal: 8,
    marginVertical: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightedCard: {
      backgroundColor: "#a6c8ff", // Более яркий фон
      transform: [{ scale: 1.1 }], // Увеличение масштаба
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
  },
  logoContainer: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  placeholderText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#999",
  },
  text: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
});