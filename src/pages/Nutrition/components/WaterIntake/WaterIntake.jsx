//React
import React, { useState } from "react";

//Styles
import styles from "./WaterIntake.module.css";

const WaterIntake = ({ dailyInfo, userData, t }) => {


  if (!dailyInfo || !userData) {
    return <p>{t("loading")}...</p>;
  }
  return (
    <div className={styles.card}>
      <p>
        {dailyInfo.waterConsumed}/{userData.userProfile.waterIntake} {t("liters")}
      </p>
      <progress
        className={styles.progressBar}
        value={dailyInfo.waterConsumed}
        max={userData.userProfile.waterIntake}
      ></progress>
      <p>{t("stayHydrated")}!</p>{" "}
    </div>
  );
};

export default WaterIntake;
