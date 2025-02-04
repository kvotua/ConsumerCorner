import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Swiper from 'react-native-swiper';
import QRCode from 'react-native-qrcode-svg'; // Импортируем QRCode
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../../Styles/Style";
import Toast from "../Notif/toasts/Toast";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function GeneratorQR({ navigation, route }) {
    const { id } = route.params; // Получаем id из параметров маршрута
    const url = `https://site.ru/${id}`; // Генерируем URL

    const [toast, setToast] = useState({ type: "", message: "", subMessage: "", visible: false });

    const showToast = (type: string, message: string, subMessage: string) => {
        setToast({ type, message, subMessage, visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 3000);
    };

    return (
        <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
            <SafeAreaView style={[styles.containerMainPage]}>
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
                    <Text style={styles.menuTitle}>Дизайн</Text>
                    <Text style={styles.menuTitle}>Вашего уголка</Text>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.menuPagesLine} />
                </View>

                {/* Swiper с увеличенной высотой */}
                <View style={{flex: 1}}>
                <Swiper style={localStyles.wrapper} showsButtons={true}

                    nextButton={<Icons name="chevron-right" size={30} color="#FFFFFF" style={{marginRight:-10}} />}
                    prevButton={<Icons name="chevron-left" size={30} color="#FFFFFF" style={{marginLeft:-10}} />}
                    paginationStyle={localStyles.paginationStyle}
                    >
                    <View style={[localStyles.slide]}>
                        <View style={localStyles.card}>
                            <QRCode
                                value={url} // Генерируем QR-код по URL
                                size={150} // Размер QR-кода
                                color="black" // Цвет QR-кода
                                backgroundColor="white" // Цвет фона
                            />
                        </View>
                    </View>
                    {/* Слайд с изображением */}
                    <View style={[localStyles.slide]}>
                        <View style={localStyles.card}>
                            <QRCode
                                value={url} // Генерируем QR-код по URL
                                size={150} // Размер QR-кода
                                color="black" // Цвет QR-кода
                                backgroundColor="white" // Цвет фона
                            />
                        </View>
                    </View>
                    <View style={[localStyles.slide]}>
                        <View style={localStyles.card}>
                            <QRCode
                                value={url} // Генерируем QR-код по URL
                                size={150} // Размер QR-кода
                                color="black" // Цвет QR-кода
                                backgroundColor="white" // Цвет фона
                            />
                        </View>
                    </View>
                </Swiper>
                </View>

                <View style={[styles.buttons, {marginTop: 0, flex: 'unset'}]}>
                    <TouchableOpacity style={styles.buttonMenuPage}>
                        <Text style={styles.blackText}>Скачать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonBackMenuPage, { marginTop: 10 }]} onPress={() => navigation.replace("Points")}>
                        <Icons name="arrow-left" size={18} color="#FFFFFF" style={[{ marginEnd: 6 }]} />
                        <Text style={styles.DefText}>Назад</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center', // Центрирует содержимое по вертикали
        alignItems: 'center', // Центрирует содержимое по горизонтали
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, // Слайды будут заполнять доступное пространство внутри
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: 275,
        height: 390,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    paginationStyle: {
        position: 'absolute',
        justifyContent: 'center',
    },
});
