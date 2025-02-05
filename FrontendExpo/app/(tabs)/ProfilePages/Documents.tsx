import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList, 
  StyleSheet,
  Image,
  Animated,
  Easing, Alert 
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import Fontisto from 'react-native-vector-icons/Fontisto';

const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

const DATA = [
  { id: '1', title: 'Item 1', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Item 2', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Item 3', image: 'https://via.placeholder.com/150' },
];

export default function Documents({ navigation }) {
  const flatListRef = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [cards, setCards] = useState([]); 
  const [selectedId, setSelectedId] = useState(null);

  const [currentDocument, setCurrentDocument] = useState(null); // Состояние для текущего документа

  const fetchDocument = async (id, navigation) => {
    try {
      const response = await fetch(`https://consumer-corner.kvotua.ru/mongo/document/${id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const document = await response.json();
      if (document && document.id) {
        setCurrentDocument(document); // Сохраняем документ в состоянии
        navigation.navigate('Doc', { document }); // Навигация к экрану документа
      } else {
        console.error(`Error fetching document ${id}:`, new Error('Invalid document data'));
      }
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
    }
  };

  const fetchDocuments = async (pointId) => {
    try {
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/${pointId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const point_info = await response.json();
      if (point_info && point_info.documents_data) {
        setDocuments(point_info.documents_data);
      } else {
        console.error(`Error fetching documents for point ${pointId}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${pointId}:`, error);
    }
  };

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
      
      if (Array.isArray(points)) {
        setCards(points);  // Сохраняем точки в стейт
        setSelectedId(points[0].id); // Устанавливаем выбранный ID на первый элемент
        fetchDocuments(points[0].id); // Загружаем документы для первого элемента
      } else {
        console.error('Error: API response is not an array');
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

const scaleAnim = useRef(new Animated.Value(1)).current;

const handlePress = (item) => {
  const isSelected = item.id === selectedId;
  
  const toValue = isSelected ? 1 : 1.1; // Уменьшить, если не выбран, иначе увеличить
  const duration = 300; 

  setSelectedId(isSelected ? null : item.id);

  if (!isSelected) {
    const index = cards.findIndex(i => i.id === item.id);
    flatListRef.current.scrollToIndex({ index, animated: true });
    fetchDocuments(item.id);
  }

  Animated.timing(scaleAnim, {
    toValue: toValue,
    duration: duration,
    easing: Easing.out(Easing.exp),
    useNativeDriver: true,
  }).start();
};

const handlePressDoc = (item) => {
  fetchDocument(item.id, navigation);
  }


const renderItem = ({ item }) => {
  const isSelected = item.id === selectedId;
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => handlePress(item)}>
        <Animated.View style={[styles2.card, { transform: [{ scale: isSelected ? 1.1 : 1 }] , backgroundColor: isSelected ? "#fff" : "#BDBDBD" },
        [!isSelected && {opacity: 0.5}]
        ]}>
        <Image source={{ uri: item.image }} style={style.image} />
        <Text style={styles2.text}>{item.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

  const  onDelete = async (point_id, document_id) => {
    try {
      const jwt = await AccessGetToken();
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/document/${point_id}/${document_id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      });
      const point_info = await response.json();
      if (point_info) {
        console.log(point_info);
        navigation.replace("Documents");
      } else {
        console.error(`Error fetching documents for point ${point_id}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${point_id}:`, error);
    }
  };
  const handleLongPress = ({ item }) => {
      // Логика для длинного нажатия
      Alert.alert(
        `Удалить документ ${item.name}`,
        "Вы уверены, что хотите удалить этот документ?",
        [
          {
            text: "Отмена",
            style: "cancel"
          },
          { 
            text: "Удалить", 
            onPress: () => {
            console.log(selectedId, item.id);
              onDelete(selectedId, item.id)},
          },
        ]
      );
    };


const renderDocument = ({ item }) => (
    <View style={{ flex: 1}}>
      <TouchableOpacity style={style.button} onPress={() => handlePressDoc(item)}  onLongPress={() => handleLongPress({item})}>
      {item.isTemp && <Fontisto name="date" size={18} color="#fff" style={[{marginRight: "10%"}]}/> }

          <Text style={localStyles.buttonText}>{item.name}</Text>
          {item.isTemp && <Fontisto name="date" size={18} color="#000" style={[{marginRight: "10%"}]}/> }
      </TouchableOpacity>
    </View>
);

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
      <View style={[localStyles.flatListContainer, {height: 120, flex: cards.length === 0 ? 1 : "unset"}]}>
           <FlatList
            data={cards}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={cards.length > 0}
            showsHorizontalScrollIndicator={false}
          />
      </View>
      <View style={{ flex: 1 }}>
          <FlatList
            data={documents}
            renderItem={renderDocument}
            keyExtractor={(item) => item.id.toString()} // Измените на соответствующий уникальный идентификатор
            style={{ paddingRight: 10 }} // Отступ для списка документов
            ListEmptyComponent={
                                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У этой точки пока что нет документов</Text>
                                          </View>
                                      }
          />
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

const style = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: 'row', // Располагаем элементы в ряд
    justifyContent: 'space-between', 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    marginTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  item: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedItem: {
    borderColor: '#000',
    transform: [{ scale: 1.2 }],
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  title: {
    textAlign: 'center',
  },
});

const localStyles = StyleSheet.create({
  selectedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // стиль выделения
  },
  flatListContainer: {
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
    flex: 1,
    textAlign: 'center', 
    fontSize: 15,
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
    backgroundColor: "#F2F2F2",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightedCard: {
      backgroundColor: "#a6c8ff", 
      transform: [{ scale: 1.1 }],
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
    paddingBottom: 8
  },
});