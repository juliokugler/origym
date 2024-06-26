import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./assets/Translations/en.json";
import ptTranslation from "./assets/Translations/pt.json";
import esTranslation from "./assets/Translations/es.json";
import deTranslation from "./assets/Translations/de.json";
import itTranslation from "./assets/Translations/it.json";
import frTranslation from "./assets/Translations/fr.json";

// Initialize i18n
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
