import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList, 
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import styles from "../../Styles/Style";

const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

const { width: screenWidth } = Dimensions.get('window');



const data3 = [
  {
    id: "1",
    title: "Dog 1"
},
{
    id: "2",
    title: "Dog 2"
},
{
    id: "3",
    title: "Dog 3"
},
{
    id: "4",
    title: "Dog 4"
},
{
  id: "5",
  title: "Dog 5"
},
{
  id: "6",
  title: "Dog 6"
},
];

export default function Documents({ navigation }) {
  const flatListRef = useRef(null);
  const [selectedId, setSelectedId] = useState(data3[0]?.id);


  const Item = ({ title, image, id }) => { 
    const backgroundColor = id === selectedId ? 'lightblue' : 'white';
    const scale = id === selectedId  ? 1.2 : 1;
    return(
    <View key={id} style={[styles3.item, {backgroundColor, transform: [{ scale }]}]}>
        <Text style={styles3.title}>{title}</Text>
    </View>
)};
  const renderItem = ({ item }) => { 
    
    return(
    <TouchableOpacity onPress={() => {
      setSelectedId(item.id);
      const index = data3.findIndex(i => i.id === item.id);
      flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0, viewOffset: 50 });
  }} activeOpacity={1}>
      <View >
      <Item id={item.id} image={item.image} title={item.title} />
      </ View>
    </TouchableOpacity>
)};
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
            <View style={styles.menuPagesFooterHeader}>
            <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
            </View>
            <View style={styles.menuPagesSecondHeader}>
            <Text style={styles.menuTitle}>Документы</Text>
            </View>
            <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
            </View>
      <View style={localStyles.flatListContainer}>
        <View style={{marginHorizontal: -30}}>
            <FlatList
              ref={flatListRef}
                data={data3}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
         </View>
      </View>
        <View style={styles.containerButtonsBottomFlatList}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddDocument")}>
            <Text style={styles.blackText}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{marginEnd: 6}]}/>
            <Text style={styles.DefText}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}



const styles3 = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center'
  },
  item: {
      backgroundColor: "#FFFFFF",
      marginVertical: 8,
      marginHorizontal: 10,
      height: 50,
      width: 100,
      borderRadius: 8,
  },
  title: {
      fontSize: 18,
  },
  image: {
      flex: 1,
  },
});

const localStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: 12,
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
  textBottomButton: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'Montserrat',
    color: "#FFFFFF",
    marginTop: 12,
    alignSelf: 'flex-start', 
  },
});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
  },
  flatList: {
    width: '100%',
    paddingLeft: 20
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
    marginVertical: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightedCard: {
      backgroundColor: "#a6c8ff", // Более яркий фон
      transform: [{ scale: 1.1 }], // Увеличение масштаба
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