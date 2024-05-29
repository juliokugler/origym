import React from "react";
import styles from "./DailyIntakes.module.css";
import { App } from "../PieChart/PieChart";

const DailyIntakes = ({ userData, dailyData, t }) => {
  let TDEE = userData.TDEE;
  let waterIntake = userData.waterIntake;
  let consumedCalories = dailyData.caloriesConsumed;
  let consumedWater = dailyData.waterConsumed;
  let proteinConsumed = dailyData.proteinConsumed;
  let carbsConsumed = dailyData.carbsConsumed;
  let fatConsumed = dailyData.fatConsumed;
  let carbsIntake = userData.carbsIntake;
  let proteinIntake = userData.proteinIntake;
  let fatIntake = userData.fatIntake;

  return (
    <div className={styles.container}>
      <App userData={userData} dailyData={dailyData} />
      <div className={styles.caloriesContainer}>
        <h1>
          {consumedCalories}
          <p>/{TDEE} kcal</p>
        </h1>
      </div>
      <div className={styles.smallCardContainer}>
        <div className={styles.percentageContainer}>
          <div className={styles.macroPercentage}>
            <p>{t("protein")}</p>
            <p>
              {proteinConsumed}/{proteinIntake}g
            </p>
          </div>
          <progress
            className="progressBar"
            value={proteinConsumed}
            max={proteinIntake}
          ></progress>
        
          <div className={styles.macroPercentage}>
            <p>{t("carbs")}</p>
            <p>
              {carbsConsumed}/{carbsIntake}g
            </p>
          </div>
          <progress
           className="progressBar"
            value={carbsConsumed}
            max={carbsIntake}
          ></progress>
        
          <div className={styles.macroPercentage}>
            <p>{t("fat")}</p>
            <p>
              {fatConsumed}/{fatIntake}g
            </p>
          </div>
          <progress
            className="progressBar"
            value={fatConsumed}
            max={fatIntake}
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default DailyIntakes;
