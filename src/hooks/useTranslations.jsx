import { useState, useEffect } from "react";
import i18n from "../i18n";

// Utility function to get short language code
const getShortLanguageCode = (lang) => {
  const langMap = {
    'pt-BR': 'pt',
    'en-US': 'en',
    'es-ES': 'es',
    'de-DE': 'de',
    'fr-FR': 'fr',
    'it-IT': 'it'
  };
  return langMap[lang] || lang.split('-')[0];
};

export const useTranslations = (user) => {
  const [currentLanguage, setCurrentLanguage] = useState(getShortLanguageCode(i18n.language || "en"));

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const shortCode = getShortLanguageCode(lng);
      console.log(`Language changed to: ${lng}, Short code: ${shortCode}`);
      setCurrentLanguage(shortCode);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Initial log
    console.log(`Initial language: ${i18n.language}, Short code: ${getShortLanguageCode(i18n.language)}`);

    // Clean up the language change listener on unmount
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [user]);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { switchLanguage, currentLanguage };
};