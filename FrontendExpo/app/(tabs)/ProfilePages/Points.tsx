import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { apiRequest } from "../../../Api/RefreshToken"; // Убедитесь, что функция apiRequest корректно импортирована
import Toast from "../Notif/toasts/Toast";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import { Swipeable } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { replace } from "expo-router/build/global-state/routing";
import { useFocusEffect } from "@react-navigation/native";
import qrcode from "../../../assets/images/qrcode.png";
const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function Points({ navigation, route }) {
  const { id } = route.params;
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const jwt = await AccessGetToken();
        const response = await fetch(`https://consumer-corner.kvotua.ru/points/points-by-enterprise/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await response.json();
        setPoints(data);
      } catch (error) {
        console.error("Ошибка при загрузке точек:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      const fetchPoints = async () => {
        try {
          const jwt = await AccessGetToken();
          const response = await fetch(`https://consumer-corner.kvotua.ru/points/points-by-enterprise/${id}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          });
          const data = await response.json();
          setPoints(data);
        } catch (error) {
          console.error("Ошибка при загрузке точек:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPoints();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  const registerPoint = async (pointData) => {
    try {
      const url = "http://localhost:8765/register";
      const response = await apiRequest(url, "POST", pointData, {});
      showToast("success", "Успешно!", "Точка успешно добавлена");
    } catch (error) {
      console.error("Ошибка при добавлении точки:", error.message);
      showToast("error", "Ошибка!", error.message || "Произошла ошибка при добавлении точки");
    }
  };

  const deletePoint = async (pointId) => {
    try {
      const url = `http://localhost:8765/delete/${pointId}`;
      const response = await apiRequest(url, "DELETE", {}, {});
      showToast("success", "Успешно!", `Точка ${pointId} успешно удалена`);
    } catch (error) {
      console.error("Ошибка при удалении точки:", error.message);
      showToast("error", "Ошибка!", error.message || "Произошла ошибка при удалении точки");
    }
  };

  const renderQR = () => (
    <View style={[localStyles.rightAction]}>
      <TouchableOpacity onPress={() => navigation.replace("QR")}>
        <Icons
          name="pencil"
          size={24}
          color="#FFFFFF"
          style={[{ marginEnd: "5%" }]}
        />
      </TouchableOpacity>
    </View>
  );

  const renderRightActions = (id) => (
    <View style={[localStyles.rightAction]}>
      <TouchableOpacity onPress={() => navigation.replace("EditMarketPoint", { id, e_id: id })}>
        <Icons
          name="pencil"
          size={24}
          color="#FFFFFF"
          style={[{ marginEnd: "5%" }]}
        />
      </TouchableOpacity>
    </View>
  );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <View style={localStyles.starsContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={localStyles.starFull}>
            ★
          </Text>
        ))}
        {hasHalfStar && <Text style={localStyles.starHalf}>★</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={localStyles.starEmpty}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const backgroungColor = "#d3d3d3";
  const renderItem = ({ item }) => {
    const imageSource = item.image_data
      ? { uri: `data:image/png;base64,${item.image_data}` }
      : require("../../../assets/images/test.jpg");

    return (
      <TouchableOpacity activeOpacity={1} key={item.id} onPress={() => navigation.replace("Points", { id: item.id })} style={{ overflow: 'hidden' }}>
        <>
          {/* Карточка с информацией */}
          <View style={{ width: "100%", backgroundColor: 'transparent', position: "absolute", zIndex: 2, borderRadius: 10 }} pointerEvents="none">
            <View style={[localStyles.card, {
              zIndex: -5,
              padding: 10,
              backgroundColor: 'transparent',
              borderRadius: 10,
              shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0
            }]}>
              <View style={[localStyles.logoContainer, { backgroundColor: 'transparent', marginRight: 6 }]}>
                <Image source={imageSource} style={{ height: 50, width: 50 }} />
              </View>
              <View style={[localStyles.cardContent, { backgroundColor: 'transparent' }]}>
                <Text style={[localStyles.subtitle, { backgroundColor: 'transparent' }]}>{item.address}</Text>
                <Text style={[localStyles.cardTitle, { backgroundColor: 'transparent' }]}>{item.title}</Text>
                <View style={[localStyles.ratingContainer, { backgroundColor: 'transparent' }]}>
                  <Text style={localStyles.cardRating}></Text>
                  {renderStars(item.middle_stars)}
                </View>
              </View>
            
            </View>
          </View>

          {/* Карточка для свайпа */}
          <Swipeable overshootRight={false} rightThreshold={100} renderRightActions={() => renderRightActions(item.id)} containerStyle={{ overflow: "visible" }}>
            <View>
              <View style={localStyles.card}>
                <View style={[localStyles.logoContainer, { backgroundColor: 'transparent'}]}></View>
                <View style={localStyles.cardContent}>
                  <Text style={localStyles.subtitle}></Text>
                  <Text style={localStyles.cardTitle}></Text>
                  <View style={localStyles.ratingContainer}>
                    <Text style={localStyles.cardRating}></Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.replace("QR", {id: item.id})} style={{zIndex: 2000}}>
                <View style={[localStyles.logoContainer, { backgroundColor: 'transparent',  }]}>
                  <Image source={qrcode} style={{ height: 50, width: 50 }} />
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </Swipeable>

          {/* Карточка для фона */}
          <View style={{ width: "100%", backgroundColor: backgroungColor, position: "absolute", marginVertical: 10, zIndex: -5, borderRadius: 10 }}>
            <View style={[localStyles.card, {
              zIndex: -5, marginVertical: 0,
              padding: 10, backgroundColor: backgroungColor, borderRadius: 10
            }]}>
              <View style={[localStyles.logoContainer, { backgroundColor: backgroungColor }]}>
                <Text style={[localStyles.logoText, { color: backgroungColor }]}>A</Text>
              </View>
              <View style={localStyles.cardContent}>
                <Text style={[localStyles.subtitle, { color: backgroungColor }]}>Пивоваренная компания</Text>
                <Text style={[localStyles.cardTitle, { color: backgroungColor }]}>{item.title}</Text>
                <View style={[localStyles.ratingContainer, { backgroundColor: backgroungColor }]}>
                  <Text style={[localStyles.cardRating, { color: backgroungColor }]}></Text>
                </View>
              </View>
            </View>
          </View>
        </>
      </TouchableOpacity>
    );
  };




  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        {/* Компонент Toast */}
        {toast.visible && (
          <Toast
            type={toast.type}
            message={toast.message}
            subMessage={toast.subMessage}
            visible={toast.visible}
            onDismiss={() => setToast({ ...toast, visible: false })} // Здесь важно передать функцию
          />
        )}
        <View style={styles.menuPagesFooterHeader}>
          <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Мои точки</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
          <FlatList
            style={[{ paddingRight: 10 }]}
            data={points}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("MarketInfo", { e_id: id, from: 'points' })}>
            <Text style={styles.blackText}>Добавить точку</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Firms")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={styles.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}


const localStyles = StyleSheet.create({
  listContainer: {
    padding: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
    overflow: "hidden",
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
