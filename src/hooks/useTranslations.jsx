import { useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../assets/Translations/en.json";
import ptTranslation from "../assets/Translations/pt.json";
import esTranslation from "../assets/Translations/es.json";
import deTranslation from "../assets/Translations/de.json";
import itTranslation from "../assets/Translations/it.json";
import frTranslation from "../assets/Translations/fr.json";

export const useTranslations = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  useEffect(() => {
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
          order: ['navigator', 'htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
          caches: ['localStorage', 'cookie'],
        },
      });

    i18n.on("languageChanged", (lng) => {
      setCurrentLanguage(lng);
    });

    return () => {
      i18n.off("languageChanged");
    };
  }, []);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { switchLanguage, currentLanguage };
};