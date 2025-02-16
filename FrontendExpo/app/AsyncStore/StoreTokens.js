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
        return token ? Number(token) : null;
    } catch (error) {
        return null;
    }
}

export const Getinn = async () => {
    try {
        const token = await AsyncStorage.getItem("Inn")
        return token;
    } catch (error) {
        return null;
    }
}

export const GetTypeFirma = async () => {
    try {
        const token = await AsyncStorage.getItem("TypeFirm")
        return token;
    } catch (error) {
        return null;
    }
}

export const GetIdFirma = async () => {
    try {
        const token = await AsyncStorage.getItem("TypeFirm")
        return Number(token);
    } catch (error) {
        return null;
    }
}