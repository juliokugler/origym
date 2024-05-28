import React from "react";
import Calculator from "../Calculator/Calculator";
import styles from "./AddMeal.module.css";

const AddMeal = ({ onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        {" "}
        <div className={styles.closeButton}>
          <button onClick={onClose}>X</button>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default AddMeal;
