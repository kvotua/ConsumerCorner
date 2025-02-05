import Style from '@/app/Styles/Style';
import React from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, Dimensions } from 'react-native';
import PdfRendererView from 'react-native-pdf-renderer';
import { WebView } from 'react-native-webview';

export default function DocumentScreen({ route }) {
  const { document } = route.params; // Получаем данные документа из параметров навигации

  const renderDocument = () => {
    if (document.content_type === 'application/pdf') {
      return (
        <View style={styles.container}>
          <WebView
            originWhitelist={['*']}
            source={{ uri: "https://zagorie.ru/upload/iblock/4ea/4eae10bf98dde4f7356ebef161d365d5.pdf" }}
            style={styles.webview}
          />
        </View>
        // <SafeAreaView style={Style.containerMainPage}>
        //   <PdfRendererView
        //     style={{ backgroundColor: 'white' }}
        //     source={'https://zagorie.ru/upload/iblock/4ea/4eae10bf98dde4f7356ebef161d365d5.pdf'}
        //     distanceBetweenPages={16}
        //     maxZoom={5}
        //     onPageChange={(current, total) => {
        //       console.log(current, total);
        //     }}
        //   />
        // </SafeAreaView>
      );
    } else if (document.type === 'image') {
      return (
        <Image
          source={{ uri: document.url }}
          style={styles.image}
          resizeMode="contain"
        />
      );
    } else {
      return <Text>Unsupported document type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderDocument()}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   pdf: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});