//React
import React, {useState, useEffect} from 'react'

//Styles
import styles from "./Settings.module.css"

//Dependencies
import classNames from 'classnames';

//Icons
import healthIcon from "../../assets/Icons/healthOption.png";
import weightOption from "../../assets/Icons/weightOption.png";
import muscleOption from "../../assets/Icons/muscleOption.png";
import healthIcon_inactive from "../../assets/Icons/healthOption_inactive.png";
import weightOption_inactive from "../../assets/Icons/weightOption_inactive.png";
import muscleOption_inactive from "../../assets/Icons/muscleOption_inactive.png";

const ActivityInfoCard = ({userData, t, handleActivityLevelChange, handleGoalChange}) => {
  const [activityLevel, setActivityLevel] = useState(userData.userProfile.activityLevel);
  const [mainGoal, setMainGoal] = useState(userData.userProfile.mainGoal);

  

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
        if (!userData.userProfile.activityLevel) {
          handleActivityLevelChange(activityLevels[0].value);
        }
        if (!userData.userProfile.mainGoal) {
          handleGoalChange(goals[0].value);
        }
      }, [userData.userProfile, handleActivityLevelChange, handleGoalChange]);
    
      const selectedGoal = goals.find(goal => goal.value === userData.userProfile.mainGoal);

      if (!userData) {
        ;
          return (
            <div className="loader-container">
              <div className="loader-medium" />
            </div>
          );
        }

  return (
    <div className='card'>
       <div className={classNames('card', styles.activityContainer)}>
          <p>{t("activityLevel")}:</p>
          <div className={styles.activityButtons}>
            {activityLevels.map(({ label, value }) => (
              <button
                key={value}
                className={userData.userProfile.activityLevel === value ? "button-small" : "notSelectedButton-small"}
                onClick={() => handleActivityLevelChange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
    <div className={styles.goalContainer}>
          <p>{t("mainGoal")}:</p>
          <div className={styles.cardsContainer}>
            {goals.map(({ label, value, icon, iconInactive }) => (
              <div
                key={value}
                className={classNames(styles.goalCard, {
                  [styles.activeGoal]: userData.userProfile.mainGoal === value,
                })}
                onClick={() => handleGoalChange(value)}
              >
                <img
                  src={userData.userProfile.mainGoal === value ? icon : iconInactive}
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
    </div>
 
  )
}

export default ActivityInfoCard