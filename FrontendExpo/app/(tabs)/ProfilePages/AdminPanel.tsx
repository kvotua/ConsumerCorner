import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SectionList
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import { Swipeable } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";
import Toast from "../Notif/toasts/Toast";

type UserInfo = {
  id: string;
  role: string;
  fio: string;
  enterprise_title: string;
};

type SectionData = {
  title: string;
  data: UserInfo[];
};


export default function AdminPanel({ navigation }) {
  const [infoTeam, setInfoTeam] = useState<SectionData[]>([]);
  const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

  const showToast = (type: string, message: string, subMessage: string) => {
    setToast({ type, message, subMessage, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Авто-скрытие через 3 сек
  };

  const backgroungColor = "#d3d3d3";

  useEffect(() => {
    fetchInfo();
  }, []);
  const fetchInfo = async () => {
    try {
      const token = await AccessGetToken();
      const url = `https://consumer-corner.kvotua.ru/enterprises/get-users`;
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const res = await data.json();
      if (res.detail) {
        const text = res.detail || "Неизвестная ошибка";
        showToast("error", "Ошибка!", text);
      } else {
        // Группируем данные по enterprise_title
        const groupedData: { [key: string]: UserInfo[] } = {};
        Object.keys(res).forEach(enterpriseId => {
          Object.keys(res[enterpriseId]).forEach(userId => {
            const user = res[enterpriseId][userId];
            if (!groupedData[user.enterprise_title]) {
              groupedData[user.enterprise_title] = [];
            }
            groupedData[user.enterprise_title].push({
              id: userId,
              role: user.role,
              fio: user.fio,
              enterprise_title: user.enterprise_title,
            });
          });
        });

        // Преобразуем в массив для SectionList
        const sectionData = Object.keys(groupedData).map(title => ({
          title,
          data: groupedData[title],
        }));

        setInfoTeam(sectionData);
      }
    } catch (error) {
      showToast("error", "Ошибка!", error.message || "Произошла неизвестная ошибка.");
    }
  };

  const renderRightActions = () => (
    <View style={[localStyles.rightAction]}>
      <Icons
        name="pencil"
        size={24}
        color="#FFFFFF"
        style={[{ marginEnd: "5%" }]}
      />
    </View>
  );


  const renderItem = ({ item }: { item: UserInfo }) => {
    return (
      <>
        <View style={{ width: "100%", backgroundColor: 'transparent', position: "absolute", zIndex: 2, borderRadius: 10 }} pointerEvents="none">
          <View style={[localStyles.card, {
            zIndex: -5,
            padding: 10,
            backgroundColor: 'transparent',
            borderRadius: 10,
            shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0
          }]}>
            <View style={[localStyles.logoContainer]}>
              <Text style={[localStyles.logoText, { backgroundColor: 'transparent' }]}>A</Text>
            </View>
            <View style={[localStyles.cardContent, { backgroundColor: 'transparent' }]}>
              <Text style={[localStyles.subtitle, { backgroundColor: 'transparent' }]}>{item.role}</Text>
              <Text style={[localStyles.cardTitle, { backgroundColor: 'transparent' }]}>{item.fio}</Text>
              <View style={[localStyles.ratingContainer, { backgroundColor: 'transparent' }]}>
                <Text style={[localStyles.cardRating, { backgroundColor: 'transparent' }]}>
                  {/* {item.rating.toFixed(2)} */}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Swipeable
          overshootRight={false} // Disable right overshoot
          rightThreshold={100} // Adjust this value as needed
          renderRightActions={renderRightActions}
          containerStyle={{ overflow: "visible" }}
        >
          <View>
            {/* Карточка */}
            <View style={localStyles.card}>
              <View style={[localStyles.logoContainer, { backgroundColor: 'transparent' }]}>
                <Text style={localStyles.logoText}></Text>
              </View>
              <View style={localStyles.cardContent}>
                <Text style={localStyles.subtitle}></Text>
                <Text style={localStyles.cardTitle}></Text>
                <View style={localStyles.ratingContainer}>
                  <Text style={localStyles.cardRating}>
                    {/* {item.rating.toFixed(2)} */}
                  </Text>
                </View>
              </View>
            </View>

            {/* Серые плашки */}

          </View>
        </Swipeable>

        <View style={{ width: "100%", backgroundColor: backgroungColor, position: "absolute", marginVertical: 10, zIndex: -5, borderRadius: 10 }}>
          <View style={[localStyles.card, {
            zIndex: -5, marginVertical: 0,
            padding: 10, backgroundColor: backgroungColor, borderRadius: 10
          }]}>
            <View style={[localStyles.logoContainer, { backgroundColor: 'transparent' }]}>
              <Text style={[localStyles.logoText, { color: backgroungColor }]}>A</Text>
            </View>
            <View style={localStyles.cardContent}>
              <Text style={[localStyles.subtitle, { color: backgroungColor }]}>Пивоваренная компания</Text>
              <Text style={[localStyles.cardTitle, { color: backgroungColor }]}>{item.name}</Text>
              <View style={[localStyles.ratingContainer, { backgroundColor: backgroungColor }]}>
                <Text style={[localStyles.cardRating, { color: backgroungColor }]}>
                  {/* {item.rating.toFixed(2)} */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={localStyles.sectionHeader}>
      <Text style={localStyles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <SafeAreaView style={styles.containerMainPage}>
        {toast.visible && (
          <Toast
            type={toast.type}
            message={toast.message}
            subMessage={toast.subMessage}
            visible={toast.visible}
            onDismiss={() => setToast({ ...toast, visible: false })}
          />
        )}
        <View style={styles.menuPagesFooterHeader}>
          <Text style={styles.footerDocumentsText}>уголок потребителя</Text>
        </View>
        <View style={styles.menuPagesSecondHeader}>
          <Text style={styles.menuTitle}>Команда</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.menuPagesLine} />
        </View>
        <View style={styles.firmsAndPointsFlatListContainer}>
        <SectionList
            sections={infoTeam}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: '50%' }}>
                <Text style={[styles.DefText, { textAlign: "center", fontSize: 30 }]}>
                  У вас еще нет администраторов и партнеров
                </Text>
                <Text style={[styles.DefText, { textAlign: "center", marginTop: 10, fontSize: 15, fontWeight: "100" }]}>
                  Нажмите кнопку “Пригласить”
                </Text>
              </View>
            }
            indicatorStyle="white"
          />
        </View>
        <View style={styles.containerButtonsBottomFlatList}>
          <TouchableOpacity style={styles.buttonMenuPage} onPress={() => navigation.replace("AddNewAdmin")}>
            <Text style={styles.blackText}>Добавить администратора</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("MenuPage")}>
            <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
            <Text style={styles.DefText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}


const localStyles = StyleSheet.create({
  listContainer: {
    padding: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  cardContent: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardRating: {
    fontSize: 14,
    color: "#777",
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  starFull: {
    color: "#FFD700",
    fontSize: 14,
  },
  starHalf: {
    color: "#FFD700",
    fontSize: 14,
    opacity: 0.5,
  },
  starEmpty: {
    color: "#C0C0C0",
    fontSize: 14,
  },
  rightAction: {
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginVertical: 10,
  },
  grayBarsContainer: {
    alignItems: "center",
  },
  grayBarFull: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    marginBottom: 0,
    borderRadius: 3,
  },
  grayBarSmall: {
    width: "20%",
    backgroundColor: "#D3D3D3",
    borderRadius: 3,
  },
  sectionHeader: {
    padding: 4,
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
