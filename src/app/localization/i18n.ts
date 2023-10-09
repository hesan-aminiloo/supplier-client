import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from '@src/app/localization/en.json';
import deJson from '@src/app/localization/de.json';

export const resources = {
  en: enJson,
  de: deJson,
};

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  returnNull: false,
  fallbackLng: ['de', 'en'],
  resources,
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
