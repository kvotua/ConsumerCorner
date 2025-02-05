import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Animated, Easing } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { apiRequest } from "../../../Api/RefreshToken"; 
import Toast from "../Notif/toasts/Toast";
import { Swipeable } from "react-native-gesture-handler";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function ChoosePoints({ navigation, route }) {
    const { socValue, link } = route.params;
    const flatListRef = useRef(null);
    const [point, setPoint] = useState([]);
    const [cards, setCards] = useState([]); 
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

  const fetchPoints = async (pointId) => {
    try {
        const jwt = await AccessGetToken();
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/points-by-enterprise/${pointId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
      });
      const point_info = await response.json();
      if (point_info) {
        setPoint(point_info);
        console.log(point_info);
      } else {
        console.error(`Error fetching documents for point ${pointId}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${pointId}:`, error);
    }
  };
  
  const fetchSocialPoints = async (pointId) => {
    try {
        console.log(pointId, socValue, link );
      const jwt = await AccessGetToken();
      const payload = {
        name: socValue,
        link: link
      };
      const response = await fetch(`https://consumer-corner.kvotua.ru/points/social/${pointId}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });
      const info = await response.json();
      if (info) {
        console.log(info);
      } else {
        console.error(`Error fetching documents for point ${pointId}:`, error);
      }
  // Сохраняем документы
    } catch (error) {
      console.error(`Error fetching documents for point ${pointId}:`, error);
    }
  };
    const fetchEnterprises = async () => {
      try {
        const jwt = await AccessGetToken();
        const response = await fetch('https://consumer-corner.kvotua.ru/enterprises/enterprises-info', {
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
          fetchPoints(points[0].id); // Загружаем документы для первого элемента
        } else {
          console.error('Error: API response is not an array');
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };


  
    useEffect(() => {
        fetchEnterprises();
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
        fetchPoints(item.id);
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
            <Text style={style.text}>{item.name}</Text>
          </Animated.View>
        </TouchableOpacity>
      );
    };

    const handlePressPoints = (id) => {
        setSelectedIds(prevIds => {
          if (prevIds.includes(id)) {
          console.log(prevIds.filter(selectedId => selectedId !== id));
            return prevIds.filter(selectedId => selectedId !== id); // Удалить id
          } else {
          console.log([...prevIds, id]);
            return [...prevIds, id]; // Добавить id
          }
        });
      };
    

      const renderSocial = ({ item }) => {
        const isSelecteda = selectedIds.includes(item.id);
        const buttonStyle = isSelecteda ? { backgroundColor: '#9AEB9D' } : { backgroundColor: '#fff' }; // Замените на нужные цвета
    
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[style.button, buttonStyle]} onPress={() => handlePressPoints(item.id)}>
              {item.isTemp && <Fontisto name="date" size={18} color="#fff" style={[{ marginRight: "10%" }]} />}
              <Text style={style.buttonText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        );
      };
      const handlePressAddSocialPoints = () => {
        selectedIds.forEach(id => {
            fetchSocialPoints(id); // Вызов функции для каждого id
          });
        navigation.replace("Social"); // Переход на другой экран
      };
    
    
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesFooterHeader}>
                    <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={[styles.menuTitle, {fontSize: 30, textAlign:"left"}]}>Выберите точки к которым добавить соц.сеть</Text>
        </View>
        <View style={[styles.containerLine]}>
          <View style={styles.menuPagesLine} />
        </View>
        {cards.length > 1 && (
        <View style={[localStyles.flatListContainer, {height: 120, flex: cards.length === 0 ? 1 : "unset"}]}>

            <FlatList
                data={cards}
                ref={flatListRef}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У вас пока что нет фирм</Text>
                </View>
                }
            />
        </View>
            )}

        <View style={{ flex: 1 }}>
            <FlatList
              data={point}
              renderItem={renderSocial}
              keyExtractor={(item) => item.id.toString()} // Измените на соответствующий уникальный идентификатор
              style={{ paddingRight: 10 }} // Отступ для списка документов
              ListEmptyComponent={
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У вас пока что нет точек</Text>
                              </View>
                          }
            />
          </View>
        <View style={[styles.containerButtonsBottomFlatList]}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={handlePressAddSocialPoints}>
            <Text style={styles.blackText}>Добавить соц.сеть</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("newSocial")}>
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