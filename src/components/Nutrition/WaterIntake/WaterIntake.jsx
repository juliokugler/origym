import React, { useState } from "react";
import styles from "./WaterIntake.module.css";

const WaterIntake = ({ userData, t }) => {
  const [waterIntake, setWaterIntake] = useState(1.2);

  return (
    <div className={styles.card}>
      <p>
        {waterIntake}/{userData.waterIntake} {t("liters")}
      </p>
      <progress
        className={styles.progressBar}
        value={waterIntake}
        max={userData.waterIntake}
      ></progress>
      <p>{t("stayHydrated")}!</p>{" "}
    </div>
  );
};

export default WaterIntake;
