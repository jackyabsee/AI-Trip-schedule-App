import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import en from '../assets/translations/en.json';
import zh from '../assets/translations/zh.json';

const translations = { en, zh };
const i18n = new I18n(translations)


export const setLanguage = async (language: string) => {
  i18n.locale = language;
  await AsyncStorage.setItem('language', language);
};

export const initLanguage = async (): Promise<string> => {
  const language = await AsyncStorage.getItem('language');
  i18n.locale = language || 'zh';
  return i18n.locale;
};

export default i18n;