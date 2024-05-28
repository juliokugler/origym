import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../assets/Translations/en.json";
import ptTranslation from "../assets/Translations/pt.json";

export const useTranslations = () => {
  useEffect(() => {
    i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        resources: {
          en: { translation: enTranslation },
          pt: { translation: ptTranslation },
        },
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
      });
  }, []);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { switchLanguage };
};
