import AsyncStorage from "@react-native-async-storage/async-storage";

export const AccessGetToken = async () => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        return token ? token : null;
    } catch (error) {
        return null;
    }
}

export const RefreshGetToken = async () => {
    try {
        const token = await AsyncStorage.getItem('refresh_token');
        return token ? token : null;
    } catch (error) {
        return null;
    }
}

export const SesIdToken = async () => {
    try {
        const token = await AsyncStorage.getItem('Ses_id');
        return token ? token : null;
    } catch (error) {
        return null;
    }
}