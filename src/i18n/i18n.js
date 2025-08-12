import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        search_placeholder: "Search sarees...",
        toggle_language: "বাংলা",
      },
    },
    bn: {
      translation: {
        search_placeholder: "শাড়ি খুঁজুন...",
        toggle_language: "English",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;