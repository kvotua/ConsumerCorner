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
import Documents from '../(tabs)/ProfilePages/Documents';
import Social from '../(tabs)/ProfilePages/Social';
import Reviews from '../(tabs)/ProfilePages/Reviews';
import Firms from '../(tabs)/ProfilePages/Firms';
import AdminPanel from '../(tabs)/ProfilePages/AdminPanel';
import Profile from '../(tabs)/ProfilePages/Profile';
import AddDocument from '../(tabs)/ProfilePages/AddDocument';
import Points from '../(tabs)/ProfilePages/Points';
import CodePageEnter from '../(tabs)/SubPages/CodePageEnter';
import AllPointsSoc from '../(tabs)/SubPages/AllPointsSoc';
import FirmsSoc from '../(tabs)/SubPages/FirmsSoc';
import AddNewAdmin from '../(tabs)/ProfilePages/AddNewAdmin';
import AssignmentPointFirm from '../(tabs)/ProfilePages/AssignmentPointFirm';

const Stack = createStackNavigator();

interface NavigateAppProps {
  onLayout?: (event: LayoutChangeEvent) => void; // Определяем тип для onLayout
}

export default function App({ onLayout }: NavigateAppProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="MenuPage">
          <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Enter} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegPage} options={{ headerShown: false }} />
          <Stack.Screen name="CodeConfirm" component={CodePage} options={{ headerShown: false }} />
          <Stack.Screen name="CodeConfirmEnt" component={CodePageEnter} options={{ headerShown: false }} />
          <Stack.Screen name="Inn" component={InnReg} options={{ headerShown: false }} />
          <Stack.Screen name="RegFirma" component={RegFirma} options={{ headerShown: false }} />
          <Stack.Screen name="MarketInfo" component={MarketPoint} options={{ headerShown: false }} />
          <Stack.Screen name="MenuPage" component={MenuPage} options={{ headerShown: false }} />
          <Stack.Screen name="Documents" component={Documents} options={{ headerShown: false }} />
          <Stack.Screen name="Social" component={Social} options={{ headerShown: false }} />
          <Stack.Screen name="Reviews" component={Reviews} options={{ headerShown: false }} />
          <Stack.Screen name="Firms" component={Firms} options={{ headerShown: false }} />
          <Stack.Screen name="AdminPanel" component={AdminPanel} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="AddDocument" component={AddDocument} options={{ headerShown: false }} />
          <Stack.Screen name="Points" component={Points} options={{ headerShown: false }} />
          <Stack.Screen name="AllPointsSoc" component={AllPointsSoc} options={{ headerShown: false }} />
          <Stack.Screen name="FirmsSoc" component={FirmsSoc} options={{ headerShown: false }} />
          <Stack.Screen name="AddNewAdmin" component={AddNewAdmin} options={{ headerShown: false }} />
          <Stack.Screen name="AssignmentPointFirm" component={AssignmentPointFirm} options={{ headerShown: false }} />
        </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
