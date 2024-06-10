import React from "react";
import styles from "./DailyIntakes.module.css";
import { App } from "../PieChart/PieChart";



const DailyIntakes = ({ userData, dailyInfo, t }) => {


  console.log("daaily info", dailyInfo)

  let TDEE = dailyInfo.TDEE;
  let consumedCalories = dailyInfo.caloriesConsumed;
  let proteinConsumed = dailyInfo.proteinConsumed;
  let carbsConsumed = dailyInfo.carbsConsumed;
  let fatConsumed = dailyInfo.fatConsumed;
  let carbsIntake = userData.userProfile.carbsIntake;
  let proteinIntake = userData.userProfile.proteinIntake;
  let fatIntake = userData.userProfile.fatIntake;

  

console.log(dailyInfo)
  return (
    <div className={styles.container}><div className={styles.caloriesContainer}>
     <App userData={userData} dailyInfo={dailyInfo} /> 
      <div className={styles.textContainer}>
              <h1>
          {consumedCalories}
          <p>/{TDEE} kcal</p>
        </h1>
      </div></div>
      <div className={styles.smallCardContainer}>
        <div className={styles.percentageContainer}>
          <div className={styles.macroPercentage}>
            <p>{t("protein")}</p>
            <p>
              {proteinConsumed.toFixed(1)}/{proteinIntake}g
            </p>
          </div>
          <progress
            className="progressBar"
            value={proteinConsumed.toFixed(1)}
            max={proteinIntake}
          ></progress>
        
          <div className={styles.macroPercentage}>
            <p>{t("carbs")}</p>
            <p>
              {carbsConsumed.toFixed(1)}/{carbsIntake}g
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
              {fatConsumed.toFixed(1)}/{fatIntake}g
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
