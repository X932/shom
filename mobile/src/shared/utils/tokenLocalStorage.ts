import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'gbefv';
export const saveToken = async (value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY);
    return value;
  } catch (e) {
    return null;
  }
};
