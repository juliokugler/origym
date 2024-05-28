import React, { useState } from "react";
import styles from "./HeartRateCard.module.css";
import HeartRate from "../Charts/HeartRate";
import { useTranslation } from "react-i18next";
const HeartRateCard = () => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const { t } = useTranslation();
  const handleUpdatePopup = () => {
    setShowUpdatePopup((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <HeartRate />
      <div className={styles.heartInfoContainer}>
        <div className={styles.heartInfo}>
          <p>128</p> <h4>Peak</h4>
        </div>

        <div className={styles.heartInfo}>
          <p>110</p> <h4>Training</h4>
        </div>
        <div className={styles.heartInfo}>
          <p>75</p> <h4>Baseline</h4>
        </div>
      </div>
    </div>
  );
};

export default HeartRateCard;
