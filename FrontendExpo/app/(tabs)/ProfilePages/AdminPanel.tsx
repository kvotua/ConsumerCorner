import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../Styles/Style";

export default function AdminPanel({ navigation }) {
  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>ИП Акулич В.C</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}