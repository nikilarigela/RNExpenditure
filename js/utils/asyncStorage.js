import AsyncStorage from "@react-native-community/async-storage";

const AUTH_KEY = "@AUTH_KEY";

export const getAuthToken = () => AsyncStorage.getItem(AUTH_KEY);

export const setAuthToken = (token) => AsyncStorage.setItem(AUTH_KEY, token);

export const removeAuthToken = () => AsyncStorage.removeItem(AUTH_KEY);
