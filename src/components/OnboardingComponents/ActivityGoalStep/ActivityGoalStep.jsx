import React from "react";
import classNames from "classnames";
import styles from "./ActivityGoalStep.module.css";
import Logo from "../../../assets/Icons/Logo.png";
import Header from "../Header/Header";

const ActivityGoalStep = ({
  userData,
  handleActivityLevelChange,
  handleGoalChange,
  handleSubmit,
  handleBack,
  t,
}) => (
  <>
   <Header t={t}/>
    <div className={classNames("card", styles.step)}>
      <div className={styles.activityLevelContainer}>
        <p>{t("selectActivityLevel")}:</p>
        <div className={styles.activityButtons}>
          {[
            { label: t("sedentary"), value: "Sedentary" },
            { label: t("lightlyActive"), value: "Lightly Active" },
            { label: t("moderatelyActive"), value: "Moderately Active" },
            { label: t("veryActive"), value: "Very Active" },
          ].map(({ label, value }) => (
            <button
              key={value}
              className={ userData.activityLevel === value ? "button-small" : "notSelectedButton-small"
              }
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
          {[t("loseFat"), t("gainLeanMass"), t("improveHealth")].map((goal) => (
            <div
              key={goal}
              className={classNames(styles.goalCard, {
                [styles.activeGoal]: userData.mainGoal === goal,
              })}
              onClick={() => handleGoalChange(goal)}
            >
              {goal.split(" ").map((word) => (
                <p key={word}>{word}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className="inactiveButton-medium" onClick={handleBack}>
          {t("back")}
        </button>
        <button className="button" onClick={handleSubmit}>
          {t("confirmAndFinish")}
        </button>
      </div>
    </div>
  </>
);

export default ActivityGoalStep;