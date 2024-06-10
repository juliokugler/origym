import React from "react";
import styles from "./Step4.module.css";

const Step4 = ({ onCreate }) => {
  return (
    <div className={styles.container}>
      <h2>Workout Created!</h2>
      <button className="inactiveButton-medium" onClick={onCreate}>
        Create Another Workout
      </button>
    </div>
  );
};

export default Step4;