import React from "react";
import styles from "./DailyIntakes.module.css";
import { App } from "../PieChart/PieChart";
import classNames from "classnames"

const DailyIntakes = ({ userData, dailyInfo, t, isMobile }) => {
  console.log("daily info", dailyInfo);

  let TDEE = dailyInfo.TDEE;
  let consumedCalories = dailyInfo.caloriesConsumed;
  let proteinConsumed = dailyInfo.proteinConsumed;
  let carbsConsumed = dailyInfo.carbsConsumed;
  let fatConsumed = dailyInfo.fatConsumed;
  let carbsIntake = userData.userProfile.carbsIntake;
  let proteinIntake = userData.userProfile.proteinIntake;
  let fatIntake = userData.userProfile.fatIntake;

  console.log(dailyInfo);

  return (
    <>
      {!isMobile ? (
        <div className={styles.container}>
          <div className={styles.caloriesContainer}>
            <App userData={userData} dailyInfo={dailyInfo} />
            <div className={styles.textContainer}>
              <h1>
                {consumedCalories}
                <p>/{TDEE} kcal</p>
              </h1>
            </div>
          </div>
          <div className={styles.smallCardContainer}>
            <div className={styles.percentageContainer}>
              <div className={styles.macroPercentage}>
                <p>{t("protein")}</p>
                <p>
                  {proteinConsumed.toFixed(1)}/{proteinIntake}g
                </p>
              </div>
              <progress
                className={styles.progressBar}
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
                className={styles.progressBar}
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
                className={styles.progressBar}
                value={fatConsumed}
                max={fatIntake}
              ></progress>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container_mobile}>
          <div className={styles.caloriesContainer_mobile}>
            <div className={styles.pieChart_mobile}>
              <App userData={userData} dailyInfo={dailyInfo} />
            </div>
            <div className={styles.textContainer_mobile}>
              <h1>
                {consumedCalories}
                <p>/{TDEE} kcal</p>
              </h1>
            </div>
          </div>
          <div className={classNames(styles.smallCardContainer, "card")}>
            <div className={styles.percentageContainer_mobile}>
              <div className={styles.macroPercentage_mobile}>
                <p>{t("protein")}</p>
                <p>
                  {proteinConsumed.toFixed(1)}/{proteinIntake}g
                </p>
              </div>
              <progress
                className={styles.progressBar_mobile}
                value={proteinConsumed.toFixed(1)}
                max={proteinIntake}
                ></progress>
</div><div className={styles.percentageContainer_mobile}>
              <div className={styles.macroPercentage_mobile}>
                <p>{t("carbs")}</p>
                <p>
                  {carbsConsumed.toFixed(1)}/{carbsIntake}g
                </p>
              </div>
              <progress
                className={styles.progressBar_mobile}
                value={carbsConsumed}
                max={carbsIntake}
              ></progress></div>
<div className={styles.percentageContainer_mobile}></div>
              <div className={styles.macroPercentage_mobile}>
                <p>{t("fat")}</p>
                <p>
                  {fatConsumed.toFixed(1)}/{fatIntake}g
                </p>
              </div>
              <progress
                className={styles.progressBar_mobile}
                value={fatConsumed}
                max={fatIntake}
              ></progress>
            </div>
            </div>
        
      )}
    </>
  );
};

export default DailyIntakes;