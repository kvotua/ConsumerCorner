import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    //все до следующего комма в основоном действует глобально на страницу
    background: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
      },
      header: {
        alignItems: "center",
        marginTop: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
      },
      //Это можно использовать для View, который располагает кнопки
      buttons: {
        width: "100%",
        alignItems: "center",
        marginTop: 40,
      },
      //Это белая кнопка с черным текстом
      WhiteButton: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
      },
      blackText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
      },
      //Это кнопка сливающаяся с фоном и текс белый
      DefButton: {
        width: "90%",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      DefText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
      },
      //текст уточнение
      footerText: {
        fontSize: 12,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 20,
      },
      TextField: {
        width: 350,
        height: 50,
        borderRadius: 5,
        backgroundColor: "white",
        paddingLeft: 10,
        marginBottom: 15,
      },
      scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      fields: {
        width: "100%",
        alignItems: "center",
        marginTop: 40
      },
  });