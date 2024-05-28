import React from "react";
import styles from "./StepsTracker.module.css";

const StepsTracker = () => {
  // Example data
  const stepsData = {
    totalSteps: 10500,
    goal: 10000,
  };

  return (
    <div className={styles.stepsTracker}>
      <p>Total Steps: {stepsData.totalSteps}</p>
      <p>Goal: {stepsData.goal}</p>
    </div>
  );
};

export default StepsTracker;
