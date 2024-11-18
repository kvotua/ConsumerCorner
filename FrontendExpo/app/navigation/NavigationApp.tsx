import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from "../(tabs)/EnterReg/StartPage";
import RegPage from "../(tabs)/EnterReg/RegPage";
import CodePage from "../(tabs)/EnterReg/CodePage";

// Создание стека навигации
let Stack = createNativeStackNavigator();

export default function NavigateApp() {
  return (
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegPage} options={{ headerShown: false }} />
        <Stack.Screen name="CodeConfirm" component={CodePage} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
