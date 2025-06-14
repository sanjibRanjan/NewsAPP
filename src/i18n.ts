import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './translations/en.json';
import hi from './translations/hi.json'; // Hindi
import es from './translations/es.json'; // Spanish

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  es: {
    translation: es,
  },
  // Add other languages here
};

i18n
  .use(initReactI18next) // passes i18n to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation is not found

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n; 