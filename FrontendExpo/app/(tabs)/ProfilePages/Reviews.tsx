import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";

export default function Reviews({ navigation }) {
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