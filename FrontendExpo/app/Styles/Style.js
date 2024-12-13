import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

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
      containerMainPage: {
        flex: 1,
        paddingVertical: isTablet ? 192 : 25, 
        paddingHorizontal: isTablet ? 152 : 25, 
      },
      containerProfile: {
        width: "100%",
        marginTop: 20,
      },
      containerButtonsDocuments: {
        width: "100%",
        marginTop: 91,
      },
      containerButtonsSocial: {
        width: "100%",
        flex: 1,
        marginTop: 24
      },
      containerButtonsMenuPages: {
        width: "100%",
        height: 120,
        paddingVertical: 10,
        justifyContent: 'flex-end',
        flex: 1,
      },
      textDescriptionProfile: {
        marginBottom: 12,
        fontSize: 18,
        fontWeight: "500",
        color: "#FFFFFF",
      }, 
      textInputProfile: {
        width: "100%",
        height: 60,
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 18,
        paddingStart: 15,
      },
      switchContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
      },
      switchText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginRight: 10,
      },
      buttonMenuPage: {
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAFBFF",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      buttonBackMenuPage: {
        width: "100%",
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: '#FAFBFF',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      textInButtonsMenuPage: {
        fontSize: 18,
        color: "#313231",
        fontWeight: "bold",
        fontFamily: 'Montserrat'
      },
      textInButtonsBackMenuPage: {
        fontSize: isTablet ? 20 :  18,
        color: "#FAFBFF",
        fontWeight: "600"
      },
      buttonDocuments: {
        width: "100%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      footerButtonTextDocuments: {
        fontSize: 15,
        fontWeight: "Bold",
        color: "#FFFFFF",
        marginTop: 13,
      },
      header: {
        alignItems: "center",
        marginTop: 20,
      },
      menuHeader: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 128,
      },
      profileHeader: {
        width: "100%",
        alignItems: 'center',
      },
      firmsAndPointsHeader: {
        width: "100%",
        alignItems: 'flex-start',
        marginTop: 70,
      },
      menuPagesFooterHeader: {
        width: "100%",
        alignItems: 'flex-start',
      },
      menuPagesHeader: {
        width: "100%",
        alignItems: 'flex-start',
        marginTop: 10,
      },
      menuPagesSecondHeader: {
        width: "100%",
        alignItems: 'flex-start',
        marginTop: 28,
      },
      headerLeft: {
        alignItems: "flex-start",
        marginTop: 20,
      },
      titleHead: {
        fontSize: 30,
        fontFamily: 'Montserrat',
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 10,
      },
      menuTitle: {
        fontFamily: 'Montserrat',
        fontSize: 30,
        fontWeight: "700",
        color: "#FFFFFF",
      },
      subtitle: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        color: "#FFFFFF",
      },
      titleSimple: {
        width:"100%",
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: "#FFFFFF",
        marginTop:15,
        alignSelf: "flex-start",
      },
      profileTitle: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "400",
      },
      //Это можно использовать для View, который располагает кнопки
      buttons: {
        flex:1,
        width: "100%",
        alignItems: "center",
        marginTop: 60,
        justifyContent: 'flex-end'
      },
      menuTopButtons: {
        width: "100%",
        flexDirection: 'row',
        gap: 10,
        marginTop: 43,
        justifyContent: 'space-between', 
      },
      menuBottomButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: 10,
        marginTop: isTablet? 72 : 48,
        justifyContent: 'space-between', // Разделяем кнопки с равными промежутками
      },
      //Это белая кнопка с черным текстом
      WhiteButton: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
      },
      whiteButtonMenuTopActive: {
        flex: 1,
        height: 77,
        backgroundColor: "#FFFFFF",
        paddingTop: 25,
        paddingStart: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      whiteButtonMenuTopNoActive: {
        flex: 1,
        height: 77,
        backgroundColor: "#C3C2C2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      whiteButtonMenuBottomActive: {
        flexDirection: 'row',
        flex: 1, 
        height: 128,
        backgroundColor: "#FFFFFF",
        paddingTop: 23,
        paddingStart: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      blackText: {
        fontFamily: 'Montserrat',
        fontSize: isTablet ? 20 : 15,
        fontWeight: "bold",
        color: "#313231",
      },
      alertText: {
        fontFamily: 'Montserrat',
        fontSize: 11,
        fontWeight: "bold",
        color: "#D83731",
      },
      //Это кнопка сливающаяся с фоном и текс белый
      DefButton: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingVertical: 15,
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
      DefText: {
        fontFamily: 'Montserrat',
        fontSize: isTablet ? 20 : 16,
        fontWeight: "bold",
        color: "#FFFFFF",
      },
      //текст уточнение
      footerText: {
        fontSize: 12,
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: 'Montserrat',
        marginBottom: 20,
        alignSelf: 'flex-end', 
        justifyContent: 'flex-end'
      },
      footerDocumentsText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: "400",
        color: "#FFFFFF",
        marginTop: 25,
        textAlign: "center",
      },
      TextField: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "white",
        paddingLeft: 10,
        marginBottom: 15,
      },
      scrollContainer: {
        flex: 1,
        marginBottom:100,
      },
      fields: {
        width: "100%",
        marginBottom: 100,
        marginTop: 5
      },
      //Эти три стиля предназначены для того, чтбы делать наложения
      passwordContainer: {
        width: "100%",
      },
      iconButton: {
        position: "absolute",
        right: 10,
        top: 20,
      },
      icon: {
        width: 24,
        height: 24,
        tintColor: "#007BFF",
      },
      containerLine: {
        paddingEnd: 92,
        width: '100%',
        marginTop: 10,
      },
      menuPagesLine: {
        width: '100%',
        height: 1, 
        backgroundColor: '#FFFFFF',
      },
      // flatlist
      firmsAndPointsFlatListContainer: {
        flex: 1,
        marginBottom: 12
      },
      itemFlatList: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10
      },
      textInFlatList: {
        fontSize: 18,
        fontWeight: "500",
        color: "#FFFFFF",
        flex: 1, 
        marginEnd: 22, 
        marginTop: isTablet ? 16 : 10
      },
      circleContainer: {
        width: 30,  
        height: 30,
        borderRadius: 30, 
        borderWidth: 1,
        borderColor: "#FFFFFF", 
        backgroundColor: "transparent", 
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      innerCircle: {
        width: 22.5, 
        height: 22.5,
        borderRadius: 22.5,
        backgroundColor: "#FFFFFF", 
      },
      containerButtonsBottomFlatList: {
        width: "100%",
        height: 120,  
       justifyContent: 'flex-end', 
      },
      //
      documentsItemFlatList: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: isTablet ? 10 : 16, 
      },
      reviewsItemFlatList: {
        marginBottom: isTablet ? 10 : 16, 
      },
      socialItemFlatList: {
        marginBottom: isTablet ? 10 : 16, 
      },
      //
      modalContent: {
        width: isTablet ? "65%" : "85%",
        // height: isTablet ? "35%" : 380,
        padding: 20,
        paddingBottom: 24,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        borderColor: "#5A7BCB",
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 0,
      },
      //
      containerBell: {
        bottom: isTablet ? 64 : 60,
        right: 12
      }
  });