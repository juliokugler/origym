import React from "react";
import styles from "./MealPopup.module.css";

const MealPopup3 = ({ onCreate }) => {
  return (
    <div className={styles.container}>
      <h2>Meal Successfully Added!</h2>

      <div className={styles.buttons}>
        <button onClick={onCreate}>Create Another</button>
        <button>Open Meal Planner</button>
      </div>
    </div>
  );
};

export default MealPopup3;
