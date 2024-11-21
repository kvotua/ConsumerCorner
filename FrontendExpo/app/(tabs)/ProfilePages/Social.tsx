import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../Styles/Style";

export default function Social({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
      <View style={styles.menuPagesFooterHeader}>
          <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesHeader}>
          <Text style={styles.menuTitle}>ИП Акулич В.С</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Социальные сети</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine}/>
        </View>
        <View style={styles.containerButtonsSocial}>
        <TouchableOpacity style={[styles.buttonDocuments, { marginBottom: 20 }]} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Яндекс</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonDocuments, { marginBottom: 20 }]} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Telegram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonDocuments, { marginBottom: 20 }]} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>ВКонтакте</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDocuments} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Сайт</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.containerButtonsMenuPages}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("Social")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить соц.сеть</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}