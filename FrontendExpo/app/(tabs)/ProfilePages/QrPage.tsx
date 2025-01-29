import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


export default function DesignYourCorner({ navigation }){
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>главный пивной магазин</Text>
      <Text style={styles.titleText}>Дизайн Вашего уголка</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://example.com/qr-code.png' }} // Замените ссылку на вашу картинку QR-кода
            style={styles.qrCode}
          />
          <Text style={styles.cardText}>ИНН № 390244679</Text>
          <Text style={styles.cardSubtitle}>
            “РЕАЛИЗУЕМ ВАШЕ ПРАВО БЫТЬ УСЛЫШАННЫМ”
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={() => alert('Скачать')}>
        <Text style={styles.buttonText}>Скачать</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => alert('Назад')}>
        <Text style={styles.buttonText}>←Назад</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});