//React
import React from "react";

//Styles
import styles from "./SpeechContainer.module.css";

//Hooks
import { useTranslation } from "react-i18next";

const SpeechContainer = ({ speaker, message }) => {
  const isYou = speaker === "You";
  const { t } = useTranslation();
  return (
    <div className={`${styles.container} ${isYou ? styles.you : styles.coach}`}>
      <h4>{isYou ? t("You") : t("Coach")}</h4>
      <div className={styles.speechBubble}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SpeechContainer;
