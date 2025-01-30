import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../Styles/Style";
import { apiRequest } from "@/Api/RefreshToken";
import Toast from "../Notif/toasts/Toast";
import { getEnterprisesInfo, registerEnterprise } from '../../../Api/registerEnterprise';
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import { replace } from 'expo-router/build/global-state/routing';
import { useFocusEffect } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;

export default function Firms({ navigation }) {
  const [firms, setfirms] = useState();

    useEffect(() => {
      fetchfirms();
    }, []);
  
    const fetchfirms = async () => {
      try {
        const jwt = await AccessGetToken();
        const response = await fetch(`https://consumer-corner.kvotua.ru/enterprises/enterprises-info`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
    
        const data = await response.json();
    
        const filteredData = await Promise.all(
          data.map(async (item) => {
            let imageData = null;
            if (item.image_id) {
              const imageResponse = await fetch(`https://consumer-corner.kvotua.ru/mongo/image/${item.image_id}`, {
                method: "GET",
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${jwt}`,
                },
              });
              const imageJson = await imageResponse.json();
              imageData = imageJson.image_data; 
            }
            return {
              id: item.id,
              name: item.name,
              middle_stars: item.middle_stars,
              general_type_activity: item.general_type_activity,
              image_data: imageData, 
            };
          })
        );
    
        setfirms(filteredData);
      } catch (error) {
        console.error("Error fetching firms:", error);
      }
    };

      useFocusEffect(
        React.useCallback(() => {
          fetchfirms();
        }, [])
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

  const renderRightActions = (id) => (
    <View style={[localStyles.rightAction]}>
      <TouchableOpacity onPress={() => navigation.replace("EditFirma", { id })}>
        <Icons
          name="pencil"
          size={24}
          color="#FFFFFF"
          style={[{ marginEnd: "5%" }]}
        />
      </TouchableOpacity>
    </View>
  );

  const backgroungColor = "#d3d3d3";
  const renderItem = ({ item }) => {
    const imageSource = item.image_data
      ? { uri: `data:image/png;base64,${item.image_data}` }
      : require("../../../assets/images/test.jpg");
    return (

      <TouchableOpacity activeOpacity={1} key={item.id} onPress={() => navigation.replace("Points", { id: item.id })} style={{ overflow: 'hidden' }}>
        <>

          {/* Карточка 2 */}
          <View style={{ width: "100%", backgroundColor: 'transparent', position: "absolute", marginVertical: 10, zIndex: 2, borderRadius: 10 }} pointerEvents="none">
            <View style={[localStyles.card, {
              zIndex: -5,
              marginVertical: 0,
              padding: 10,
              backgroundColor: 'transparent',
              borderRadius: 10,
              shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0
            }]}>
              <View style={[localStyles.logoContainer, { backgroundColor: 'transparent' }]}>
                <Image source={imageSource} style={{ height: 50, width: 50, backgroundColor: 'transparent' }} />
              </View>
              <View style={[localStyles.cardContent, { backgroundColor: 'transparent' }]}>
                <Text style={[localStyles.subtitle, { backgroundColor: 'transparent' }]}>{item.general_type_activity}</Text>
                <Text style={[localStyles.cardTitle, { backgroundColor: 'transparent' }]}>{item.name}</Text>
                <View style={[localStyles.ratingContainer, { backgroundColor: 'transparent' }]}>
                  <Text style={[localStyles.cardRating, { backgroundColor: 'transparent' }]}>
                    {/* {item.rating.toFixed(2)} */}
                  </Text>
                  {renderStars(item.middle_stars)}
                </View>
              </View>
            </View>
          </View>
          {/* Карточка 1 */}
          <Swipeable
        overshootRight={false} // Disable right overshoot
        rightThreshold={100} // Adjust this value as needed
            renderRightActions={() => renderRightActions(item.id)}
            containerStyle={{ overflow: "visible" }}
          >
            <View>
              <View style={localStyles.card}>
                <View style={[localStyles.logoContainer, { backgroundColor: 'transparent' }]}>
                </View>

                <View style={localStyles.cardContent}>
                  <Text style={localStyles.subtitle}></Text>
                  <Text style={localStyles.cardTitle}></Text>
                  <View style={localStyles.ratingContainer}>
                    <Text style={localStyles.cardRating}>
                      {/* {item.rating.toFixed(2)} */}
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </Swipeable>
          {/* Серая плашка */}
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
                <Text style={[localStyles.cardTitle, { color: backgroungColor }]}>{item.name}</Text>
                <View style={[localStyles.ratingContainer, { backgroundColor: backgroungColor }]}>
                  <Text style={[localStyles.cardRating, { color: backgroungColor }]}>
                    {/* {item.rating.toFixed(2)} */}
                  </Text>
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
      <SafeAreaView style={[styles.containerMainPage, { marginRight: 5 }]}>
             <View style={styles.menuPagesFooterHeader}>
            <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
            </View>
            <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Мои фирмы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
          <FlatList
            style={[{ paddingRight: 10 }]}
            data={firms}
            keyExtractor={(item) => item.name.toString()}
            renderItem={renderItem}
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace('EditFirma')}>
            <Text style={styles.blackText}>Добавить фирму</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
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