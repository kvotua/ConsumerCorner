import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const DocumentScreen = ({ route }) => {
  const { document } = route.params; // Получаем данные документа из параметров навигации

  // const renderDocument = () => {
  //   if (document.type === 'pdf') {
  //     return (
  //       <Pdf
  //         source={{ uri: document.document_data, cache: true }}
  //         style={styles.pdf}
  //       />
  //     );
  //   } else if (document.type === 'image') {
  //     return (
  //       <Image
  //         source={{ uri: document.url }}
  //         style={styles.image}
  //         resizeMode="contain"
  //       />
  //     );
  //   } else {
  //     return <Text>Unsupported document type</Text>;
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* {renderDocument()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default DocumentScreen;
