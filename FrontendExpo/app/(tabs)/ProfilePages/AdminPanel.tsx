import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { Swipeable } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";


export default function AdminPanel({ navigation }) {
  const backgroungColor = "#d3d3d3";
  const data = [
    { id: '1', status: "Собственник", title: "Егоров Егор" },
  ];

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
                  <Text style={localStyles.subtitle}>{item.status}</Text>
                  <Text style={localStyles.cardTitle}>{item.title}</Text>
                  <View style={localStyles.ratingContainer}>
                    <Text style={localStyles.cardRating}>
                      {/* {item.rating.toFixed(2)} */}
                    </Text>
                  </View>
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
          <Text style={styles.menuTitle}>Администраторы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine}/>
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
        <FlatList style={[{ paddingRight: 10 }]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: '50%' }}>
            <Text style={[styles.DefText, { textAlign: "center", fontSize:30 }]}>
              У вас еще нет администраторов и партнеров
            </Text>
            <Text style={[styles.DefText, { textAlign: "center", marginTop: 10, fontSize: 15, fontWeight: "100" }]}>
              Нажмите кнопку “Пригласить”
            </Text>
          </View>
          }
            indicatorStyle="white"
        />
      </View>
      <View style={styles.containerButtonsBottomFlatList}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddNewAdmin")}>
            <Text style={styles.blackText}>Добавить администратора</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.DefText}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
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
