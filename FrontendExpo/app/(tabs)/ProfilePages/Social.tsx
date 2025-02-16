import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, Image, Animated, Easing, Linking, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function AssignmentPointFirm({ navigation }) {
    const flatListRef = useRef(null);
    const [social, setSocial] = useState([]);
    const [cards, setCards] = useState([]); 
    const [selectedId, setSelectedId] = useState(null);

  const fetchSocial = async (pointId) => {
    try {
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/${pointId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const point_info = await response.json();
      if (point_info && point_info.social_data) {
        setSocial(point_info.social_data);
        console.log(point_info);
      } else {
        console.error(`Error fetching documents for point ${pointId}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${pointId}:`, error);
    }
  };

  const  onDelete = async (point_id, social_id) => {
    try {
      console.log(social);
      const payload = {
        social_id: Number(social_id),
      };
      const jwt = await AccessGetToken();
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/social/${point_id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload),
      });
      const point_info = await response.json();
      if (point_info) {
        console.log(point_info);
      } else {
        console.error(`Error fetching documents for point ${point_id}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${point_id}:`, error);
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
        
        console.log('Fetched points:', points); // Log the API response
    
        if (Array.isArray(points)) {
          setCards(points);  // Сохраняем точки в стейт
          setSelectedId(points[0].id); // Устанавливаем выбранный ID на первый элемент
          fetchSocial(points[0].id); // Загружаем документы для первого элемента
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
        fetchSocial(item.id);
      }
    
      Animated.timing(scaleAnim, {
        toValue: toValue,
        duration: duration,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();

    };

    const renderItem = ({ item }) => {
      const isSelected = item.id === selectedId;
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => handlePress(item)}>
            <Animated.View style={[style.card, { transform: [{ scale: isSelected ? 1.1 : 1 }] , backgroundColor: isSelected ? "#fff" : "#BDBDBD" },
            [!isSelected && {opacity: 0.5}]
            ]}>
            <Image source={{ uri: item.image }} style={style.image} />
            <Text style={style.text}>{item.title}</Text>
          </Animated.View>
        </TouchableOpacity>
      );
    };

    const handlePressSoc = ({ item }) => {
      // Проверяем, если у элемента есть ссылка
      console.log(item);
      if (item.link) {
        Linking.openURL(item.link).catch(err => console.error('Ошибка при открытии ссылки:', err));
      }
    };
  
    const handleLongPress = ({ item }) => {
      // Логика для длинного нажатия
      Alert.alert(
        `Удалить соц.сеть ${item.name}`,
        "Вы уверены, что хотите удалить эту соц.сеть?",
        [
          {
            text: "Отмена",
            style: "cancel"
          },
          { 
            text: "Удалить", 
            onPress: () => {
            console.log(selectedId, item.social_id);
              onDelete(selectedId, item.social_id)},
          },
        ]
      );
    };

    const renderSocial = ({ item }) => (
        <View style={{ flex: 1}}>
          <TouchableOpacity style={style.button} onPress={() => handlePressSoc({item})} onLongPress={() => handleLongPress({item})}>
          {item.isTemp && <Fontisto name="date" size={18} color="#fff" style={[{marginRight: "10%"}]}/> }
    
              <Text style={style.buttonText}>{item.name}</Text>
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
          <Text style={[styles.menuTitle, {fontSize: 30, textAlign:"left"}]}>Все соц.сети</Text>
        </View>
        <View style={[styles.containerLine]}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={[localStyles.flatListContainer, {height: 120, flex: cards.length === 0 ? 1 : "unset"}]}>
            <FlatList
              data={cards}
              ref={flatListRef}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={cards.length > 0}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У вас пока что нет точек</Text>
                </View>
            }
            />
        </View>
        <View style={{ flex: 1 }}>
            <FlatList
              data={social}
              renderItem={renderSocial}
              keyExtractor={(item) => item.social_id.toString()} // Измените на соответствующий уникальный идентификатор
              style={{ paddingRight: 10 }} // Отступ для списка документов
              ListEmptyComponent={
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У этой точки пока что нет соц.сетей</Text>
                              </View>
                          }
            />
          </View>
        <View style={[styles.containerButtonsBottomFlatList]}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("newSocial")}>
            <Text style={styles.blackText}>Добавить соц.сеть</Text>
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
    marginTop: 12,
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 40,
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  cardContent: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardRating: {
    fontSize: 14,
    color: "#777",
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  starFull: {
    color: "#FFD700",
    fontSize: 14,
  },
  starHalf: {
    color: "#FFD700",
    fontSize: 14,
    opacity: 0.5,
  },
  starEmpty: {
    color: "#C0C0C0",
    fontSize: 14,
  },
  rightAction: {
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginVertical: 10,
  },
  grayBarsContainer: {
    alignItems: "center",
  },
  grayBarFull: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    marginBottom: 0,
    borderRadius: 3,
  },
  grayBarSmall: {
    width: "20%",
    backgroundColor: "#D3D3D3",
    borderRadius: 3,
  },
});

const styles2 = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f4ff",
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
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 5,
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

  const style = StyleSheet.create({
    buttonText: {
      flex: 1,
      textAlign: 'center', 
      fontSize: 15,
      fontFamily: 'Montserrat',
      fontWeight: "bold"
    },
    text: {
      color: "#000",
      fontSize: 12,
      fontWeight: "bold",
      paddingBottom: 8
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