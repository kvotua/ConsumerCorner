import React, { useEffect, useState } from "react";
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

export default function Reviews({ navigation, pointId }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = await AccessGetToken()
      const response = await fetch(`http://localhost:8000/?point_id=${pointId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`, // Подставь токен сюда
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const reviewsData = await response.json();
      setData(reviewsData); // Сохраняем данные отзывов
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  };

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
    <View style={Style.reviewsItemFlatList}>
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
          <View style={[Style.containerLine, { marginTop: 10, paddingEnd: 186 }]}>
            <View style={[Style.menuPagesLine, { backgroundColor: "#3A6CE9" }]} />
          </View>
          <Text style={[localStyles.textInReview, { color: "#313231", marginTop: 10 }]}>{review}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <View style={Style.firmsAndPointsHeader}>
          <Text style={Style.menuTitle}>Все отзывы</Text>
        </View>
        <View style={Style.containerLine}>
          <View style={Style.menuPagesLine} />
        </View>
        <View style={localStyles.flatListContainer}>
          <FlatList
            style={[{ paddingRight: 10 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Нет отзывов</Text>}
            indicatorStyle="white"
          />
        </View>

        <View style={localStyles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonBackMenuPage} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  flatListContainer: {

    flex: 1,
    marginBottom: 22
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
    padding: 15,
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
containerButtonsBottomFlatList: {
  width: "100%",
  height: 45,  
 justifyContent: 'flex-end', 
},
});
