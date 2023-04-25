import AsyncStorage from '@react-native-async-storage/async-storage';

const PHONE_NUMBER_KEY = 'soimw';
export const savePhoneNumber = async (value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(PHONE_NUMBER_KEY, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getPhoneNumber = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(PHONE_NUMBER_KEY);
    return value;
  } catch (e) {
    return null;
  }
};

export const removePhoneNumber = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(PHONE_NUMBER_KEY);
    return true;
  } catch (e) {
    return false;
  }
};
