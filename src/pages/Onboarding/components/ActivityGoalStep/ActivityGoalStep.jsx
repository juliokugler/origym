//React
import React, { useEffect } from "react";

//Styles
import styles from "./ActivityGoalStep.module.css";

//Dependencies
import classNames from "classnames";

//Icons
import healthIcon from "../../../../assets/Icons/healthOption.png";
import weightOption from "../../../../assets/Icons/weightOption.png";
import muscleOption from "../../../../assets/Icons/muscleOption.png";
import healthIcon_inactive from "../../../../assets/Icons/healthOption_inactive.png";
import weightOption_inactive from "../../../../assets/Icons/weightOption_inactive.png";
import muscleOption_inactive from "../../../../assets/Icons/muscleOption_inactive.png";

//Components
import Header from "../Header/Header";

const ActivityGoalStep = ({
  userData,
  handleActivityLevelChange,
  handleGoalChange,
  handleSubmit,
  handleBack,
  t,
}) => {
  const activityLevels = [
    { label: t("sedentary"), value: "Sedentary" },
    { label: t("lightlyActive"), value: "Lightly Active" },
    { label: t("moderatelyActive"), value: "Moderately Active" },
    { label: t("veryActive"), value: "Very Active" },
  ];

  const goals = [
    { label: t("loseFat"), value: "Lose Fat", icon: weightOption, iconInactive: weightOption_inactive },
    { label: t("gainLeanMass"), value: "Gain Lean Mass", icon: muscleOption, iconInactive: muscleOption_inactive },
    { label: t("improveHealth"), value: "Improve Health", icon: healthIcon, iconInactive: healthIcon_inactive },
  ];

  useEffect(() => {
    if (!userData.activityLevel) {
      handleActivityLevelChange(activityLevels[0].value);
    }
    if (!userData.mainGoal) {
      handleGoalChange(goals[0].value);
    }
  }, [userData, handleActivityLevelChange, handleGoalChange]);

  const selectedGoal = goals.find(goal => goal.value === userData.mainGoal);

  return (
    <>
      <Header t={t} />
      <div className={classNames("card", styles.step)}>
        <div className={styles.activityLevelContainer}>
          <p>{t("selectActivityLevel")}:</p>
          <div className={styles.activityButtons}>
            {activityLevels.map(({ label, value }) => (
              <button
                key={value}
                className={userData.activityLevel === value ? "button-small" : "notSelectedButton-small"}
                onClick={() => handleActivityLevelChange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.goalContainer}>
          <p>{t("selectMainGoal")}:</p>
          <div className={styles.cardsContainer}>
            {goals.map(({ label, value, icon, iconInactive }) => (
              <div
                key={value}
                className={classNames(styles.goalCard, {
                  [styles.activeGoal]: userData.mainGoal === value,
                })}
                onClick={() => handleGoalChange(value)}
              >
                <img
                  src={userData.mainGoal === value ? icon : iconInactive}
                  alt={value}
                  className={styles.goalIcon}
                />
              </div>
            ))}
          </div>
          {selectedGoal && (
            <p className={styles.selectedGoalLabel}>{selectedGoal.label}</p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className="inactiveButton-medium" onClick={handleBack}>
            {t("goBack")}
          </button>
          <button className="button" onClick={handleSubmit}>
            {t("confirmAndFinish")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ActivityGoalStep;