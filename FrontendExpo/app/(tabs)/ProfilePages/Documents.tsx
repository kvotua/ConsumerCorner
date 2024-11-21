import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../Styles/Style";

export default function Documents({ navigation }) {
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
            <Text style={styles.menuTitle}>Документы</Text>
            </View>
            <View style={styles.containerLine}>
            <View style={styles.menuPagesLine}/>
            </View>
        <View style={styles.containerButtonsDocuments}>
        <TouchableOpacity style={styles.buttonDocuments} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Лицензия 1</Text>
        </TouchableOpacity>
        <Text style={[styles.footerButtonTextDocuments, { marginBottom: 61 }]}>заменить/удалить</Text>
        <TouchableOpacity style={styles.buttonDocuments} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Сертификат 1</Text>
        </TouchableOpacity>
        <Text style={[styles.footerButtonTextDocuments, { marginBottom: 61 }]}>заменить/удалить</Text>
        <TouchableOpacity style={styles.buttonDocuments} onPress={() => navigation.replace("Documents")}>
            <Text style={styles.textInButtonsMenuPage}>Барная лицензия</Text>
        </TouchableOpacity>
        <Text style={styles.footerButtonTextDocuments}>заменить/удалить</Text>
        </View>
        <View style={styles.containerButtonsMenuPages}>
        <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("Social")}>
            <Text style={styles.textInButtonsMenuPage}>Добавить документ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Text style={styles.textInButtonsBackMenuPage}>Назад</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}