import React from "react";
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
import styles from "../../Styles/Style";

export default function Reviews({ navigation }) {
  
  const data = [
    {
      id: '1',
      company: 'Компания 1',
      point: 'Точка 1',
      rating: 4,
      reviews: [
        "Отзыв 1",
        "Отличное заведение! Пришлось немного подождать, но это мелочи.",
        "Отзыв 3"
      ]
    },
    {
      id: '2',
      company: 'Компания 2',
      point: 'Точка 2',
      rating: 5,
      reviews: [
        "Отзыв 1",
        "Отличное заведение! Пришлось немного подождать, но это мелочи."
      ]
    },
    {
      id: '3',
      company: 'Компания 3',
      point: 'Точка 3',
      rating: 3,
      reviews: [
        "Отличное заведение! Пришлось немного подождать, но это мелочи."
      ]
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const color = i <= rating ? '#3A6CE9' : '#D3D3D3';
      stars.push(
        <Text key={i} style={{ color, fontSize: 18 }}>★</Text>
      );
    }
    return <View style={localStyles.starsContainer}>{stars}</View>;
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewsItemFlatList}>
      <Text style={localStyles.companyPointText}>{item.company} {item.point}</Text>
      {item.reviews.map((review, index) => (
        <TouchableOpacity key={index} style={localStyles.button}>
          <View style={localStyles.reviewContainer}>
            <Image
              source={require("../../../assets/images/reviewImage.png")}
            />
            <View style={localStyles.guestContainer}>
              <Text style={[localStyles.textInReview, { marginTop: 4 }]}>Гость</Text>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={[styles.containerLine, { marginTop: 10, paddingEnd: 186 }]}>
            <View style={[styles.menuPagesLine, { backgroundColor: "#3A6CE9" }]} />
          </View>
          <Text style={[localStyles.textInReview, { color: "#313231", marginTop: 10 }]}>{review}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.firmsAndPointsHeader}>
          <Text style={styles.menuTitle}>Все отзывы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={localStyles.flatListContainer}>
          <FlatList style={[{ paddingRight: 10 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет отзывов</Text>}
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsMenuPages}>
          <TouchableOpacity style={styles.buttonBackMenuPage} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  flatListContainer: {
    height: "75%"
  },
  companyPointText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FAFBFF",
    marginTop: 10,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    marginTop: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestContainer: {
    flexDirection: 'column',
    marginStart: 12,
    justifyContent: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  textInReview: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: "700",
    color: "#3A6CE9",
},
});
