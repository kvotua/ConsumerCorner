import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { LayoutChangeEvent } from 'react-native';

import StartPage from '../(tabs)/EnterReg/StartPage';
import RegPage from '../(tabs)/EnterReg/RegPage';
import CodePage from '../(tabs)/EnterReg/CodePage';
import InnReg from '../(tabs)/EnterReg/InnPage';
import RegFirma from '../(tabs)/EnterReg/RegFirmaPage';
import MarketPoint from '../(tabs)/EnterReg/RegMarketPoint';
import Enter from '../(tabs)/EnterReg/EnterPage';
import MenuPage from '../(tabs)/ProfilePages/MenuPage';
import Documents from '../(tabs)/ProfilePages/MenuPage';
import Social from '../(tabs)/ProfilePages/MenuPage';

const Stack = createStackNavigator();

interface NavigateAppProps {
  onLayout?: (event: LayoutChangeEvent) => void; // Определяем тип для onLayout
}

export default function App({ onLayout }: NavigateAppProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Enter} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegPage} options={{ headerShown: false }} />
          <Stack.Screen name="CodeConfirm" component={CodePage} options={{ headerShown: false }} />
          <Stack.Screen name="Inn" component={InnReg} options={{ headerShown: false }} />
          <Stack.Screen name="RegFirma" component={RegFirma} options={{ headerShown: false }} />
          <Stack.Screen name="MarketInfo" component={MarketPoint} options={{ headerShown: false }} />
          <Stack.Screen name="MenuPage" component={MenuPage} options={{ headerShown: false }} />
          <Stack.Screen name="Documents" component={Documents} options={{ headerShown: false }} />
          <Stack.Screen name="Social" component={Social} options={{ headerShown: false }} />
        </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
