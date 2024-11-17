import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from '../Pages/StartPage';
import RegPage from '../Pages/RegPage';
import CodePage from '../Pages/CodePage'

// Определение параметров навигации
export type RootStackParamList = {
  Start: undefined;
  Register: undefined;
  CodeConfirm: {phone: string}
};

// Создание стека навигации
let Stack = createStackNavigator<RootStackParamList>();

export default function NavigateApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Screen name="Register" component={RegPage} />
        <Stack.Screen name="CodeConfirm" component={CodePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
