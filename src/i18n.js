
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationHI from "./locales/hi/translation.json";

const savedLang = localStorage.getItem("appLang") || "en";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    hi: {
      translation: translationHI,
    },
  },
  lng: savedLang, // default language
  fallbackLng: "en", // fallback language if the current language translation is not available,
  interpolation: {
    escapeValue: false, // react already does escaping
  },
});

export default i18n;
