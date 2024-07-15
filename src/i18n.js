import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import ptTranslation from "./locales/pt/translation.json";
import esTranslation from "./locales/es/translation.json";
import deTranslation from "./locales/de/translation.json";
import itTranslation from "./locales/it/translation.json";
import frTranslation from "./locales/fr/translation.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
      es: { translation: esTranslation },
      it: { translation: itTranslation },
      de: { translation: deTranslation },
      fr: { translation: frTranslation },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        "navigator",
        "htmlTag",
        "cookie",
        "localStorage",
        "sessionStorage",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
