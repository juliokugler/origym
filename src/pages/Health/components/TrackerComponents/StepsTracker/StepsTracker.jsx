//React
import React from "react";

//Styles
import styles from "./StepsTracker.module.css";

const StepsTracker = () => {
  const stepsData = {
    totalSteps: 7500,
    goal: 10000,
  };

  const progress = Math.min((stepsData.totalSteps / stepsData.goal) * 100, 100);

  return (
    <div className={styles.stepsTracker}>
      <div className={styles.header}>
        <h2>Steps Tracker</h2>
      </div>
      <div className={styles.progressContainer}>
        <div className="progressBar"style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.stepsInfo}>
        <p>Total Steps: {stepsData.totalSteps}</p>
        <p>Goal: {stepsData.goal}</p>
      </div>
    </div>
  );
};

export default StepsTracker;