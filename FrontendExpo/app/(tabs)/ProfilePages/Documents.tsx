import React, { useEffect, useRef, useState } from "react";
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
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

export default function Documents({ navigation }) {
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [data, setData] = useState();
  const [cards, setCards] = useState([]); 
  const fetchPoints = async () => {
    try {
      const jwt = await AccessGetToken();
      const response = await fetch('https://consumer-corner.kvotua.ru/points/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      });
      const points = await response.json();
      
      console.log('Fetched points:', points); // Log the API response
  
      if (Array.isArray(points)) {
        setCards(points);  // Сохраняем точки в стейт
        points.forEach(async (point) => {
          await fetchDocuments(point.id);
        });
      } else {
        console.error('Error: API response is not an array');
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  // // Функция для получения документов для точки
  // const fetchDocuments = async (pointId) => {
  //   try {
  //     const response = await fetch(`https://consumer-corner.kvotua.ru/points/document/${pointId}`, {
  //       method: 'GET',
  //       headers: {
  //         'accept': 'application/json',
  //       },
  //     });
  //     const documents = await response.json();
  //     if (documents && documents.document_data) {
  //       setData((prevData) => [...prevData, ...documents.document_data]);
  //     } else {
  //       console.error('Данные документов недоступны', documents);
  //     }
  // // Сохраняем документы
  //   } catch (error) {
  //     console.error(`Error fetching documents for point ${pointId}:`, error);
  //   }
  // };
  

  
  
  const Card = ({ image_id, title, isHighlighted }) => {
    const imageSource = image_id
    ? { uri: `data:image/png;base64,${image_id}` }
    : require("../../../assets/images/test.jpg");
    return (
      <View
        style={[
          styles2.card,
          isHighlighted && styles2.highlightedCard,
        ]}
      >
        <View style={styles2.logoContainer}>
          <Image source={imageSource} style={{ height: 50, width: 50 }} />
        </View>
        <Text style={styles2.text}>{title}</Text>
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

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
            <View style={styles.menuPagesFooterHeader}>
            <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
            </View>
            <View style={styles.menuPagesSecondHeader}>
            <Text style={styles.menuTitle}>Документы</Text>
            </View>
            <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
            </View>
      <View style={localStyles.flatListContainer}>
      <FlatList
            ref={flatListRef}
            data={cards}
            horizontal
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <Card image_id={item.image_id} title={item.title} isHighlighted={index === visibleIndex} />
            )}
            showsHorizontalScrollIndicator={false}
          />
{/* 
        <FlatList style={[{ paddingRight: 10}]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "40%" }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У вас пока что нет документов.</Text>
          </View>
          }
          indicatorStyle="white"
        /> */}
      </View>
        <View style={styles.containerButtonsBottomFlatList}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.blackText}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.DefText}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginTop: 12,
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
    height: 110,
    marginHorizontal: 8,
    marginVertical: 8,
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
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden"
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