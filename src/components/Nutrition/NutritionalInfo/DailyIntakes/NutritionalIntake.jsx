import React from "react";
import styles from "./NutritionalIntake.module.css";
import { App } from "../../PieChart/PieChart";

const NutritionalIntake = ({ userData, dailyInfo, t, ingredientCalories, ingredientProtein, ingredientCarbs, ingredientFat }) => {
  let TDEE = dailyInfo.TDEE;
  let consumedCalories = dailyInfo.caloriesConsumed;
  let proteinConsumed = dailyInfo.proteinConsumed;
  let carbsConsumed = dailyInfo.carbsConsumed;
  let fatConsumed = dailyInfo.fatConsumed;
  let carbsIntake = userData.userProfile.carbsIntake;
  let proteinIntake = userData.userProfile.proteinIntake;
  let fatIntake = userData.userProfile.fatIntake;

  const calculatePercentage = (value, total) => (value / total) * 100;

  const consumedCaloriesPercentage = calculatePercentage(consumedCalories, TDEE);
  const ingredientCaloriesPercentage = calculatePercentage(ingredientCalories, TDEE);

  const consumedProteinPercentage = calculatePercentage(proteinConsumed, proteinIntake);
  const ingredientProteinPercentage = calculatePercentage(ingredientProtein, proteinIntake);

  const consumedCarbsPercentage = calculatePercentage(carbsConsumed, carbsIntake);
  const ingredientCarbsPercentage = calculatePercentage(ingredientCarbs, carbsIntake);

  const consumedFatPercentage = calculatePercentage(fatConsumed, fatIntake);
  const ingredientFatPercentage = calculatePercentage(ingredientFat, fatIntake);

  return (
    <div className={styles.container}>
      <div className={styles.caloriesContainer}>
        <App ingredientCalories={ingredientCalories} userData={userData} dailyInfo={dailyInfo} />
        <div className={styles.textContainer}>
          <h1>
            {ingredientCalories}
            <p>/{TDEE} kcal</p>
          </h1>
        </div>
      </div>
      <div className={styles.smallCardContainer}>
        <div className={styles.percentageContainer}>
                  {/* Custom progress bar for Protein */}
          <div className={styles.macroPercentage}>
            <p>{t("protein")}</p>
            <p>
              {proteinConsumed.toFixed(1)}/{proteinIntake}g
            </p>
          </div>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#35373D', width: `${consumedProteinPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#FFF27A', width: `${ingredientProteinPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarRemaining}
              style={{ width: `${100 - consumedProteinPercentage - ingredientProteinPercentage}%` }}
            ></div>
          </div>

          {/* Custom progress bar for Carbs */}
          <div className={styles.macroPercentage}>
            <p>{t("carbs")}</p>
            <p>
              {carbsConsumed.toFixed(1)}/{carbsIntake}g
            </p>
          </div>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#35373D', width: `${consumedCarbsPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#FFF27A', width: `${ingredientCarbsPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarRemaining}
              style={{ width: `${100 - consumedCarbsPercentage - ingredientCarbsPercentage}%` }}
            ></div>
          </div>

          {/* Custom progress bar for Fat */}
          <div className={styles.macroPercentage}>
            <p>{t("fat")}</p>
            <p>
              {fatConsumed.toFixed(1)}/{fatIntake}g
            </p>
          </div>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#35373D', width: `${consumedFatPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarSegment}
              style={{ backgroundColor: '#FFF27A', width: `${ingredientFatPercentage}%` }}
            ></div>
            <div
              className={styles.progressBarRemaining}
              style={{ width: `${100 - consumedFatPercentage - ingredientFatPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalIntake;