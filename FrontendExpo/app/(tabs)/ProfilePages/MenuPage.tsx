import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../Styles/Style";

export default function Menupage({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
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
            onPress={() => navigation.replace("Documents")}
          >
            <Text style={styles.blackText}>Отзывы и приложения</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuBottomActive} onPress={() => navigation.replace("Social")}>
            <Text style={styles.blackText}>Фирмы/точки</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.whiteButtonMenuBottomActive}
            onPress={() => navigation.replace("Documents")}
          >
            <Text style={styles.blackText}>Администрирование</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButtonMenuBottomActive} onPress={() => navigation.replace("Social")}>
            <Text style={styles.blackText}>Профиль</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Удобные инструменты позволяют вашему бизнесу быть в курсе и оперативно
          реагировать на пожелания клиента.
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
}