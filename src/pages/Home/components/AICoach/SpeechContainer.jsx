//React
import React from "react";

//Styles
import styles from "./SpeechContainer.module.css";

const SpeechContainer = ({ speaker, message, t }) => {
  const isYou = speaker === "You";
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
