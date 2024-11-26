import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import styles from "../../Styles/Style";

export default function Menupage({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>ИП Акулич В.C</Text>
        </View>

        <View style={styles.menuTopButtons}>
          <TouchableOpacity
            style={styles.whiteButtonMenuTopNoActive}
            onPress={() => navigation.replace("Documents")}
          >
            <Text style={styles.blackText}>Документы</Text>
            <Text style={styles.alertText}>Не заполнены</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuTopActive} onPress={() => navigation.replace("Social")}>
            <Text style={styles.blackText}>Соц. сети</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuBottomButtons}>
          <TouchableOpacity
            style={styles.whiteButtonMenuBottomActive}
            onPress={() => navigation.replace("Reviews")}
          >
            <Text style={styles.blackText}>Отзывы и приложения</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuBottomActive} onPress={() => navigation.replace("Firms")}>
            <Text style={styles.blackText}>Фирмы/точки</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.whiteButtonMenuBottomActive}
            onPress={() => navigation.replace("AdminPanel")}
          >
            <Text style={styles.blackText}>Администрирование</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuBottomActive} onPress={() => navigation.replace("Profile")}>
            <Text style={styles.blackText}>Профиль</Text>
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
    fontSize: 16,
    color: "#EEF3FF",
    textAlign: "center",
    fontFamily: 'Montserrat',
    marginBottom: 15,
    fontWeight: "400"
  },
  footerTextContainer: {
      flex: 1,
      justifyContent: 'flex-end',
  }
});