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
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";

export default function Documents({ navigation }) {

  const horizontalData = [
    { id: '1', title: "ПК ПОНАРТ", image: require("../../../assets/images/test.jpg")  },
    { id: '2', title: "ПК ПОНАРТ", image: require("../../../assets/images/test.jpg")  },
    { id: '3', title: "ПК ПОНАРТ", image: require("../../../assets/images/test.jpg") },
    { id: '4', title: "ПК ПОНАРТ", image: require("../../../assets/images/test.jpg")  },
  ];

  const data = [
    { id: '1', title: "Лицензия 1"},
    { id: '2', title: "Сертификат 1"},
    { id: '3', title: 'Барная лицензия'},
  ];

  // Рендеринг горизонтального FlatList
  const renderHorizontalItem = ({ item }) => (
    <View style={localStyles.horizontalCard}>
      <Image source={item.image} style={localStyles.listButtonImage} />
      <Text style={localStyles.horizontalCardText}>{item.title}</Text>
    </View>
  );

  // Рендеринг основного FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={localStyles.listButton}>
      <Text style={localStyles.listButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuPagesFooterHeader}>
          <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesHeader}>
          <Text style={styles.menuTitle}>Все документы</Text>
          <View style={styles.containerLine}>
            <View style={styles.menuPagesLine} />
          </View>
        </View>
        <View style={localStyles.flatListContainer}>
          <FlatList
            horizontal
            data={horizontalData}
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={localStyles.horizontalList}
          />
          <View style={[styles.containerLine, {marginTop: 0}]}>
            <View style={styles.menuPagesLine} />
          </View>
        </View>
        <View style={localStyles.verticalListContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>Нет документов</Text>}
              style={localStyles.verticalList}
            />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить документ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  horizontalList: {
    marginVertical: 10,
  },
  horizontalCard: {
    width: 90,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  horizontalCardText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verticalListContainer: {
    flex: 1,
    marginTop: 10,
  },
  verticalList: {
    flex: 1,
  },
  listButton: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    marginVertical: 4,
    alignItems: 'center',
  },
  listButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  listButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
