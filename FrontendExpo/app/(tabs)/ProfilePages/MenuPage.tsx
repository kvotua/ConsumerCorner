import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Dimensions
} from "react-native";
import styles from "../../Styles/Style";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

export default function Menupage({ navigation }) {
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });
  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };
  var info = {}
  // useEffect(() => {
  //   fetchReviews();
  // }, []);
  const fetchReviews = async () => {
    try {
      const token = AccessGetToken();
      const url = `https://consumer-corner.kvotua.ru/enterprises/get-users`;
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const res = data.json();
      info = res;
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
    }
  }


  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
      <View style={[styles.menuHeader, { marginTop: Platform.OS === 'ios' ? 10 : 50, height: 80,justifyContent: 'flex-end', }]}>
      <Text style={styles.menuTitle} >Здравствуйте, Екатерина</Text>
        </View>

        <View style={styles.menuTopButtons}>
          <TouchableOpacity
            style={styles.whiteButtonMenuTopNoActive}
            onPress={() => navigation.replace("Documents")}
          >
          <View style={[{flex: 1, justifyContent: "space-between",}]}>
          <Text style={[styles.blackText, {paddingTop: isTablet ? 30 : 25, paddingStart: 15}]}>Документы</Text>
            <Text style={[styles.alertText, { paddingStart: 15, }]}>Не заполнены</Text>
            <Image
            source={require("../../../assets/images/corner.png")}
            style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 20, right: 10}]}
          />
        </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuTopActive} onPress={() => navigation.replace("Social")}>
          <View style={[{flex: 1, justifyContent: "space-between",}]}>
            <Text style={styles.blackText}>Соц. сети</Text>
            <Image
            source={require("../../../assets/images/corner.png")}
            style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 10, right: 10}]}
          />
          </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuBottomButtons}>
          <TouchableOpacity
            style={styles.whiteButtonMenuBottomActive}
            onPress={() => navigation.replace("Reviews")}
          >
            <View style={[{flex: 1, justifyContent: "space-between",}]}>
                <Text style={styles.blackText}>Отзывы и предложения</Text>
                <View style={styles.containerBell}>  
                  {/* <Text style={[{fontSize: 10, fontWeight: "bold", fontFamily: "Montserrat", textAlign: "right", top: 4}]}>4</Text> */}
                  {/* <Icons style={[{alignSelf: "flex-end"}]} name="bell" size={22} color="black" /> */}
            </View>
            <Image
                source={require("../../../assets/images/corner.png")}
                style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 10, right: 10}]} 
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuBottomActive} onPress={() => navigation.replace("Firms")}>
            <View style={[{flex: 1, justifyContent: "space-between",}]}>
                <Text style={styles.blackText}>Фирмы/точки</Text>
                <Image
                source={require("../../../assets/images/corner.png")}
                style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 10, right: 10}]} 
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={localStyles.menuAdminButtons}>
          <TouchableOpacity
            style={styles.whiteButtonMenuBottomActive}
            onPress={() => navigation.replace("AdminPanel")}
          >
          <View style={[{flex: 1, justifyContent: "space-between",}]}>
            <Text style={[styles.blackText, { paddingEnd: 24 }]}>Команда</Text>
            <Image
            source={require("../../../assets/images/corner.png")}
            style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 10, right: 10}]}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.whiteButtonMenuBottomActive} 
            onPress={() => navigation.replace("Profile")}
          >
            <View style={[{flex: 1, justifyContent: "space-between",}]}>
            <Text style={[styles.blackText, {paddingEnd: 24}]}>Профиль</Text>
            <Image
            source={require("../../../assets/images/corner.png")}
            style={[{ width: 25, height: 25, alignSelf: "flex-end", bottom: 10, right: 10}]} 
          />
          </View>
          </TouchableOpacity>
        </View>

        <View style={localStyles.footerTextContainer}>
          <Text style={localStyles.footerText}>
            Удобные инструменты позволяют вашему бизнесу быть в курсе и оперативно
            реагировать на пожелания клиента
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  footerText: {
    fontSize: isTablet ? 16 : 12 ,
    color: "#EEF3FF",
    textAlign: "center",
    fontFamily: 'Montserrat',
    marginBottom: Platform.OS === 'ios' ? isTablet ? 0 : "10%" : "10%",
    fontWeight: "400"
  },
  footerTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuAdminButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      gap: 10,
      marginTop: 10,
      justifyContent: 'space-between', 
  },
});
