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
import GetCountPoints from '../../../Api/ReviewsPointsGet'
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

const months = [
  'Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'
];

export default function Reviews({ navigation, pointId }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const Points = await GetCountPoints(); // Получаем список точек
      const reviewPromises = Points.map(point =>
        fetch(`https://consumer-corner.kvotua.ru/comments/?point_id=${point.id}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        }).then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews for point_id=${point.id}`);
          }
          return response.json();
        })
      );
  
      const reviewsData = await Promise.all(reviewPromises);
      
      // Фильтруем только те точки, у которых есть отзывы
      const filteredData = Points.map((point, index) => ({
        ...point,
        reviews: reviewsData[index],
      })).filter(point => point.reviews.length > 0); 
      
      console.log(filteredData);
      setData(filteredData); // Сохраняем только нужные точки
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
    <View style={styles.reviewsItemFlatList}>
      <Text style={localStyles.companyPointText}>{item.title || '' }</Text> {/* Название точки */}
      {item.reviews.length > 0 ? (
        <FlatList
          data={item.reviews}
          keyExtractor={(review) => review.id.toString()}
          renderItem={({ item: review }) => {
            // Преобразуем дату для каждого отзыва
            const date = new Date(review.created_at);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
  
            return (
              <View style={localStyles.reviewContainer}>
                <TouchableOpacity style={localStyles.button}>
                  <View style={localStyles.reviewContainer}>
                    <Image
                      source={review.image_data
                        ? { uri: `data:image/png;base64,${review.image_data}` }
                        : require("../../../assets/images/reviewImage.png")}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                    <View style={localStyles.guestContainer}>
                      <Text style={[localStyles.textInReview, { marginTop: 4 }]}>
                        {review.name && review.name.trim() !== '' ? review.name : 'Гость'}
                      </Text>
                      {renderStars(review.stars || "")} {/* Рейтинг отзыва (если есть поле stars) */}
                    </View>
                  </View>
                  <View style={[styles.containerLine, { marginTop: 10, paddingEnd: 186 }]}>
                    <View style={[styles.menuPagesLine, { backgroundColor: "#3A6CE9" }]} />
                  </View>
                  <Text style={[localStyles.textInReview, { color: "#313231", marginTop: 10 }]}>
                    {review.text || ''} 
                  </Text>
                </TouchableOpacity>
                {/* Дата сверху справа */}
                <Text style={{ position: 'absolute', top: 20, right: 10, fontSize: 13, color: '#999' }}>
                  {formattedDate}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <Text style={{ color: '#fff', padding: 10 }}>Нет отзывов</Text>
      )}
    </View>
  );
  
  
  

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesFooterHeader}>
        <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Все отзывы</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={localStyles.flatListContainer}>
          <FlatList
            style={[{ paddingRight: 10, flex: 1 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "40%" }}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>У вас пока что нет отзывов.</Text>
                </View>
            }
            indicatorStyle="white"
          />
        </View>

        <View style={localStyles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonBackMenuPage} onPress={() => navigation.replace("MenuPage")}>
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
