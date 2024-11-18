import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "../(tabs)/EnterReg/StartPage";
import RegPage from "../(tabs)/EnterReg/RegPage";
import CodePage from "../(tabs)/EnterReg/CodePage";

// Создание стека навигации
let Stack = createStackNavigator();

export default function NavigateApp() {
  return (
    <Stack.Navigator initialRouteName="Start">

      <Stack.Screen 
        name="Start" 
        component={StartPage} 
        
      />
      <Stack.Screen name="Register" component={RegPage} />
      <Stack.Screen name="CodeConfirm" component={CodePage} />
    </Stack.Navigator>
  );
}
