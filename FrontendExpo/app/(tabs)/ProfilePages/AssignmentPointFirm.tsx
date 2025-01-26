import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { apiRequest } from "../../../Api/RefreshToken"; 
import Toast from "../Notif/toasts/Toast";
import { Swipeable } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function AssignmentPointFirm({ navigation }) {
    const [points, setPoints] = useState([]);
    const [firms, setfirms] = useState();
    const [visibleIndex, setVisibleIndex] = useState(0);
    const data = [
        { id: "1", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "2", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "3", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "4", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "5", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "6", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "7", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "8", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "9", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
        { id: "10", name: "Пивоваренная компания\nПК ПОНАРТ", middle_stars: 3.87 },
    ];
    const cards = [
        { id: 1, logo: "", text: "ПК ПОНАРТ" },
        { id: 2, logo: "", text: "ПК ПОНАРТ" },
        { id: 3, logo: "", text: "ПК ПОНАРТ" },
        { id: 4, logo: "", text: "ПК ПОНАРТ" },
        { id: 5, logo: "", text: "ПК ПОНАРТ" },
        { id: 6, logo: "", text: "ПК ПОНАРТ" },
        { id: 7, logo: "", text: "ПК ПОНАРТ" },
        { id: 8, logo: "", text: "ПК ПОНАРТ" },
    ];

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
          setVisibleIndex(viewableItems[0].index); 
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
    
      const renderRightActions = () => (
        <View style={[localStyles.rightAction]}>
          <Icons
            name="pencil"
            size={24}
            color="#FFFFFF"
            style={[{ marginEnd: "5%" }]}
          />
        </View>
      );
    
    const backgroungColor = "#d3d3d3";
      const renderItem = ({ item }) => {
        return (
          <>
          <Swipeable
            renderRightActions={renderRightActions}
            containerStyle={{overflow: "visible"}}
          >
            <View>
              {/* Карточка */}
              <View style={localStyles.card}>
                <View style={localStyles.logoContainer}>
                  <Text style={localStyles.logoText}>A</Text>
                </View>
                <View style={localStyles.cardContent}>
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={localStyles.subtitle}>Пивоваренная компания</Text>
                        <Text style={localStyles.cardTitle}>{item.name}</Text>
                        <View style={localStyles.ratingContainer}>
                            <Text style={localStyles.cardRating}>
                            {/* {item.rating.toFixed(2)} */}
                            </Text>
                            {renderStars(item.middle_stars)}
                        </View>
                    </TouchableOpacity>
                </View>
              </View>
    
              {/* Серые плашки */}
              
              </View>
          </Swipeable>
    
      <View style={{width: "100%", backgroundColor: backgroungColor, position: "absolute", marginVertical: 10, zIndex: -5, borderRadius: 10}}>
      <View style={[localStyles.card, { zIndex: -5, marginVertical: 0,
      padding: 10,  backgroundColor: backgroungColor, borderRadius: 10}]}>
        <View style={[localStyles.logoContainer, {backgroundColor: backgroungColor}]}>
          <Text style={[localStyles.logoText, {color: backgroungColor}]}>A</Text>
        </View>
        <View style={localStyles.cardContent}>
          <Text style={[localStyles.subtitle, {color: backgroungColor}]}>Пивоваренная компания</Text>
          <Text style={[localStyles.cardTitle, {color: backgroungColor}]}>{item.name}</Text>
          <View style={[localStyles.ratingContainer, {backgroundColor: backgroungColor}]}>
            <Text style={[localStyles.cardRating, {color: backgroungColor}]}>
              {/* {item.rating.toFixed(2)} */}
            </Text>
          </View>
        </View>
      </View>
      </View>
      </>
        );
      };

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.firmsAndPointsHeader}>
          <Text style={[styles.menuTitle, {fontSize: 18, textAlign:"left"}]}>Присвойте Трошкину Александру Сергеевичу  фирму или торговые точки находящиеся в его управлении</Text>
        </View>
        <View style={[styles.containerLine, {marginBottom: -60}]}>
          <View style={styles.menuPagesLine} />
        </View>
              <FlatList
                data={cards}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <Card logo={item.logo} text={item.text} isHighlighted={index === visibleIndex} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles2.flatListContent}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                style={{height:0}}
            />
        <View style={[styles.containerLine, {marginTop: -60}]}>
          <View style={styles.menuPagesLine} />
        </View>
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={localStyles.listContainer}
              nestedScrollEnabled={true}
              style={{ overflow: "hidden", flex: 1 }}
          />
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage}>
            <Text style={styles.textInButtonsMenuPage}>Сохранить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("AddNewAdmin")}>
            <Text style={styles.textInButtonsBackMenuPage}>←Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  listContainer: {
    paddingBottom: 40,
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