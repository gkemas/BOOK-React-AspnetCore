// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dil dosyalarınızın bulunduğu yolu belirtin
import translationEN from '../locales/en.json';
import translationTR from '../locales/tr.json';

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Varsayılan dil
    interpolation: {
      escapeValue: false, // React tarafından sağlanan çeviri değerleri için HTML özelliğini devre dışı bırakmak için
    },
  });

export default i18n;
