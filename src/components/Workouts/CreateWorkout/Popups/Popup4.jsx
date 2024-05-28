import React, { useState } from "react";
import styles from "../Popup4.module.css";

const Popup4 = ({ onSave, onCreate }) => {
  return (
    <div className={styles.container}>
      <h2>Workout Successfully Created!</h2>

      <div className={styles.buttonContainer}>
        <button className={styles.active} onClick={onCreate}>
          Create Another Workout
        </button>
        <button onClick={onSave}>Share Workout</button>
      </div>
    </div>
  );
};

export default Popup4;
