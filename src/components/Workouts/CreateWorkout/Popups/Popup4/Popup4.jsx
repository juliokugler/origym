import React, { useState } from "react";
import styles from "./Popup4.module.css";

const Popup4 = ({ onSave, onCreate }) => {
  return (
    <div className={styles.container}>
      <h2>Workout Successfully Created!</h2>

      <div className={styles.buttonContainer}>
        <button className="button" onClick={onCreate}>
          Create Another Workout
        </button>
        <button className="inactiveButton-medium" onClick={onSave}>Share Workout</button>
      </div>
    </div>
  );
};

export default Popup4;
