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
        paddingVertical: 20,
      },
      header: {
        alignItems: "center",
        marginTop: 20,
      },
      menuHeader: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 181,
        marginStart:20,
        paddingLeft: 10,
      },
      headerLeft: {
        alignItems: "flex-start",
        marginTop: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 10,
      },
      menuTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
      },
      subtitle: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
      },
      titleSimple: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 10,
        alignSelf: "flex-start",
      },
      //Это можно использовать для View, который располагает кнопки
      buttons: {
        width: "100%",
        alignItems: "center",
        marginTop: 40,
      },
      menuTopButtons: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        paddingStart: 25,
        paddingEnd: 24,
        marginTop: 43,
      },
      menuBottomButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        width: "100%",
        gap: 10,
        paddingStart: 20,
        paddingEnd: 40, 
        marginTop: 73,
        marginBottom: 245,
      },
      //Это белая кнопка с черным текстом
      WhiteButton: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      whiteButtonMenuTopActive: {
        flex: 1,
        height: 77,
        backgroundColor: "#FFFFFF",
        paddingTop: 25,
        paddingStart: 15,
        paddingBottom: 20,
        paddingEnd:15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      whiteButtonMenuTopNoActive: {
        flex: 1,
        height: 77,
        backgroundColor: "#C3C2C2",
        paddingTop: 25,
        paddingStart: 15,
        paddingBottom: 20,
        paddingEnd:15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      whiteButtonMenuBottomActive: {
        width: '48%',
        height: 128,
        backgroundColor: "#FFFFFF",
        paddingTop: 23,
        paddingStart: 16,
        paddingBottom: 10,
        paddingEnd: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        
      },
      blackText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000",
      },
      alertText: {
        fontSize: 11,
        color: "#D83731",
      },
      //Это кнопка сливающаяся с фоном и текс белый
      DefButton: {
        width: "90%",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingVertical: 15,
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
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
      //Эти три стиля предназначены для того, чтбы делать наложения
      passwordContainer: {
        position: "relative",
        width: 350,
        marginBottom: 15,
      },
      iconButton: {
        position: "absolute",
        right: 10,
        top: 12,
      },
      icon: {
        width: 24,
        height: 24,
        tintColor: "#007BFF",
      },
  });