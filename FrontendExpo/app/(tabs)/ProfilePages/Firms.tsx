import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../Styles/Style";

const screenWidth = Dimensions.get("window").width;

export default function Firms({ navigation }) {
  const data = [
    { id: "1", title: "Пивоваренная компания\nПК ПОНАРТ", rating: 3.87 },
    { id: "2", title: "Пивоваренная компания\nПК ПОНАРТ", rating: 3.87 },
  ];

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
              <Text style={localStyles.subtitle}>Пивоваренная компания</Text>
              <Text style={localStyles.cardTitle}>{item.title}</Text>
              <View style={localStyles.ratingContainer}>
                <Text style={localStyles.cardRating}>
                  {item.rating.toFixed(2)}
                </Text>
                {renderStars(item.rating)}
              </View>
            </View>
          </View>

          {/* Серые плашки */}
          
          </View>
      </Swipeable>

<View style={{width: "100%", backgroundColor: "grey", position: "absolute", marginVertical: 10  }}>
<View style={[localStyles.card, { zIndex: -5, marginVertical: 0,
padding: 10,}]}>
  <View style={localStyles.logoContainer}>
    <Text style={localStyles.logoText}>A</Text>
  </View>
  <View style={localStyles.cardContent}>
    <Text style={localStyles.subtitle}>Пивоваренная компания</Text>
    <Text style={localStyles.cardTitle}>{item.title}</Text>
    <View style={localStyles.ratingContainer}>
      <Text style={localStyles.cardRating}>
        {item.rating.toFixed(2)}
      </Text>
      {renderStars(item.rating)}
    </View>
  </View>
</View>
</View>
</>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.firmsAndPointsHeader}>
          <Text style={styles.menuTitle}>Мои фирмы</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={localStyles.listContainer}
          style={{ overflow: "visible"}}
        />
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity
            style={styles.buttonMenuPage}
            onPress={() => navigation.replace("Social")}
          >
            <Text style={styles.textInButtonsMenuPage}>Добавить фирму</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBackMenuPage, { marginTop: 10 }]}
            onPress={() => navigation.replace("MenuPage")}
          >
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
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
