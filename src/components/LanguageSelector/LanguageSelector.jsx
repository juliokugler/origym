import React from "react";
import classNames from "classnames";
import flagPt from "../../assets/Icons/flag_pt.png";
import flagEn from "../../assets/Icons/flag_en.png";
import flagEs from "../../assets/Icons/flag_es.png";
import flagFr from "../../assets/Icons/flag_fr.png";
import flagIt from "../../assets/Icons/flag_it.png";
import flagDe from "../../assets/Icons/flag_de.png";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = ({ language, handleLanguageChange }) => (
  <div className={styles.languageContainer}>
    <div className={styles.flagContainer}>
      {(() => {
        switch (language) {
          case "pt":
            return <img src={flagPt} alt="Portuguese Flag" />;
          case "en":
            return <img src={flagEn} alt="English Flag" />;
          case "es":
            return <img src={flagEs} alt="Spanish Flag" />;
          case "fr":
            return <img src={flagFr} alt="French Flag" />;
          case "de":
            return <img src={flagDe} alt="German Flag" />;
          case "it":
            return <img src={flagIt} alt="Italian Flag" />;
          default:
            return null;
        }
      })()}
    </div>
    <div className={classNames("card", styles.languageDropdown)}>
      <select id="language" onChange={handleLanguageChange}>
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
      </select>
    </div>
  </div>
);

export default LanguageSelector;