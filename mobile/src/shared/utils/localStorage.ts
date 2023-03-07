import AsyncStorage from '@react-native-async-storage/async-storage';

const phoneNumberKey = 'soimw';
export const savePhoneNumber = async (value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(phoneNumberKey, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getPhoneNumber = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(phoneNumberKey);
    return value;
  } catch (e) {
    return null;
  }
};
