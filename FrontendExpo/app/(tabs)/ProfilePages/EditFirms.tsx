import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";
import Style from "@/app/Styles/Style";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import IconImg from "../../../assets/images/svg/Icon.svg";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

export default function EditFirma({ navigation, route }) {
  const {id} = route.params;
  const [NameFima, setValue] = useState("");
  const [OGRN, setValue2] = useState("");
  const [Adress, setValue3] = useState("");
  const [VidDo, setValue4] = useState("");
  const [logo, setLogo] = useState(null);

  const fetchFirms = async () => {
    try {
      const jwt = await AccessGetToken();
      const response = await fetch(`https://consumer-corner.kvotua.ru/enterprises/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();

      setValue(data.name || "");
      setValue2(data.ogrn || "");
      setValue3(data.address || "");
      setValue4(data.general_type_activity || "");
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const DeletePoint = async () => {
    try {
      const jwt = await AccessGetToken();
      const response = await fetch(`https://consumer-corner.kvotua.ru/enterprises/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFirms();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const SendToServerReg = async () => {
    navigation.replace("Firms");
  };

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={Style.background}>
      <SafeAreaView style={Style.containerMainPage}>
        <View style={Style.headerLeft}>
          <Text style={Style.titleHead}>Редактор фирм </Text>
          <Text style={[Style.titleHead, { color: "#FFFFFF", opacity: 50, fontSize: 14 }]}>{NameFima || 'название фирмы'}</Text>
          <View style={Style.containerLine}>
            <View style={Style.menuPagesLine} />
          </View>
        </View>

        <ScrollView contentContainerStyle={localStyles.scrollViewContent} indicatorStyle="white">
          <View style={localStyles.fields}>
            <Text style={Style.titleSimple}>Название фирмы</Text>
            <TextInput
            returnKeyType="done"
              value={NameFima}
              onChangeText={setValue}
              style={Style.textInputProfile}
              placeholder="Строй Загарод"
            />

            <Text style={Style.titleSimple}>ОГРН юридического лица</Text>
            <TextInputMask
              type={"custom"}
              returnKeyType="done"
              options={{ mask: "9999999999999" }}
              value={OGRN}
              onChangeText={setValue2}
              keyboardType="phone-pad"
              style={Style.textInputProfile}
              placeholder="1147847423899"
            />

            <Text style={Style.titleSimple}>Фактический адрес</Text>
            <TextInput
            returnKeyType="done"
              style={[Style.textInputProfile, 
                // isAddressFilled && { backgroundColor: '#fddb67' }
              ]}
              placeholder="ул. Павлика Морозова 74Б"
              value={Adress}
              onChangeText={setValue3}
            />

            <Text style={Style.titleSimple}>Основной вид деятельности</Text>
            <TextInput
            returnKeyType="done"
              style={Style.textInputProfile}
              placeholder="Частное предприятие"
              value={VidDo}
              onChangeText={setValue4}
            />
          </View>
          <View style={localStyles.centeredContainer}>
            <TouchableOpacity style={localStyles.uploadBox} onPress={pickImage}>
              {logo ? (
                <Image source={{ uri: logo }} style={localStyles.image} />
              ) : (
                <>
                  <IconImg width={100} height={100} />
                  <Text style={localStyles.uploadText}>Прикрепите логотип фирмы</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[Style.buttonMenuPage, {backgroundColor: 'red'}]} onPress={DeletePoint}>
            <Text style={Style.DefText}>Удалить</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={localStyles.containerButtonsMenuPages}>
          <TouchableOpacity style={Style.buttonMenuPage} onPress={SendToServerReg}>
            <Text style={Style.blackText}>Далее</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Firms")}>
            <Icon name="arrow-left" size={18} color="#FFFFFF" style={{ marginEnd: 6 }} />
            <Text style={Style.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1 },
  centeredContainer: {
    marginTop: 15,
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  fields: { width: "100%" },
  uploadBox: {
    width: "90%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: { color: "#FFFFFF", fontSize: 16, textAlign: "center" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  containerButtonsMenuPages: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
