import React from "react";
import styles from "./HydrationTracker.module.css";

const HydrationTracker = () => {
  // Example data
  const hydrationData = {
    totalIntake: "2.5L",
    goal: "3L",
  };

  return (
    <div className={styles.hydrationTracker}>
      <p>Total Intake: {hydrationData.totalIntake}</p>
      <p>Goal: {hydrationData.goal}</p>
    </div>
  );
};

export default HydrationTracker;
