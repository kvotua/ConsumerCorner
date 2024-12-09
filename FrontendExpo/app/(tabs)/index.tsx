import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import NavigateApp from '../navigation/NavigationApp';
// import ScreenOrientation from 'expo-screen-orientation';

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // async function changeScreenOrientation() {
  //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  // }

  // changeScreenOrientation();

  // Функция для загрузки шрифтов
  const loadFonts = useCallback(async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        Montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      });
      setFontsLoaded(true); 
    } catch (e) {
      console.error('Error loading fonts', e);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Скрыть SplashScreen, когда шрифты готовы
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Пока шрифты не загружены, ничего не рендерим
  }

  return (
            <NavigateApp onLayout={onLayoutRootView} />
  );
}
