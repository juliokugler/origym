import React, {useState} from 'react'
import classNames from 'classnames';
import styles from "./Settings.module.css"

const ActivityInfoCard = ({contextUserData, t, handleActivityLevelChange, handleGoalChange}) => {
  const [activityLevel, setActivityLevel] = useState(contextUserData.userProfile.activityLevel);
  const [mainGoal, setMainGoal] = useState(contextUserData.userProfile.mainGoal);

      if (!contextUserData) {
      ;
        return (
          <div className="loader-container">
            <div className="loader-medium" />
          </div>
        );
      }
  return (
    <div className={classNames('card', styles.activityContainer)}>
    <h3>Activity & Goals</h3>
    <div className={styles.inputGroup}>
      <p>{t('selectActivityLevel')}:</p>
      <div className={styles.activityButtons}>
        {[
          { label: t('sedentary'), value: 'Sedentary' },
          { label: t('lightlyActive'), value: 'Lightly Active' },
          { label: t('moderatelyActive'), value: 'Moderately Active' },
          { label: t('veryActive'), value: 'Very Active' },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={
              contextUserData.userProfile.activityLevel === value
                ? 'button-small'
                : 'notSelectedButton-small'
            }
            onClick={() => handleActivityLevelChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
    <div className={styles.inputGroup}>
        <p>{t("selectMainGoal")}:</p>
        <div className={styles.cardsContainer}>
          {[t("loseFat"), t("gainLeanMass"), t("improveHealth")].map((goal) => (
            <div
              key={goal}
              className={classNames(styles.goalCard, {
                [styles.activeGoal]: contextUserData.userProfile.mainGoal === goal,
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
    </div>
 
  )
}

export default ActivityInfoCard