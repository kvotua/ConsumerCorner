import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from "react-native";

export default function Toast({ type, message, subMessage, visible, onDismiss}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Анимация появления/исчезновения
  const progressAnim = useRef(new Animated.Value(100)).current; // Анимация полоски времени
  const translateX = useRef(new Animated.Value(0)).current; // Анимация для свайпа

  useEffect(() => {
    if (visible) {
      // Показать уведомление
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Анимация полоски времени
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 3000, // Длительность уведомления
        useNativeDriver: false,
      }).start();
    } else {
      // Скрыть уведомление
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        progressAnim.setValue(100); // Сброс полоски времени
        translateX.setValue(0); // Сброс положения уведомления
      });
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 20, // Начинаем жест, если сдвиг больше 20px
    onPanResponderMove: Animated.event(
      [null, { dx: translateX }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 100) {
        // Если свайп вправо больше 100px — скрываем уведомление
        Animated.timing(translateX, {
          toValue: 500, // Уводим уведомление за пределы экрана
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onDismiss(); // Уведомление об окончании
        });
      } else {
        // Возвращаем уведомление на место
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const getNotificationStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "white", borderColor: "#28A745" };
      case "error":
        return { backgroundColor: "#F8D7DA", borderColor: "#DC3545" };
      case "warning":
        return { backgroundColor: "#FFF3CD", borderColor: "#FFC107" };
      default:
        return { backgroundColor: "#FFFFFF", borderColor: "#007FFF" };
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return require("../../../../assets/images/accept.png");
      case "error":
        return require("../../../../assets/images/error.png");
      case "warning":
        return require("../../../../assets/images/warn.png");
      default:
        return require("../../../../assets/images/info.png");
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.notification,
        getNotificationStyle(),
        { opacity: fadeAnim, transform: [{ translateX }] },
      ]}
    >
      <View style={styles.content}>
        <Image source={getIcon()} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.message}>{message}</Text>
          {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
        </View>
      </View>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    top: 50,
    right: "5%",
    width: "60%",
    padding: 15,
    zIndex: 1000,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subMessage: {
    fontSize: 12,
    color: "grey",
    marginTop: 4,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#007FFF",
    borderRadius: 2,
    marginTop: 10,
  },
});