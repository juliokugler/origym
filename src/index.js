import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import "./index.css";

// Import translation files
import enTranslation from "./assets/Translations/en.json";
import ptTranslation from "./assets/Translations/pt.json";

// Initialize i18next
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

const root = createRoot(document.getElementById("root")); // Use createRoot instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
