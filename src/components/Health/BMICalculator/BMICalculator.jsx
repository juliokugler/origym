import React, { useState } from "react";
import styles from "./BMICalculator.module.css";
import { useTranslation } from "react-i18next";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const { t } = useTranslation();

  const calculateBMI = () => {
    if (!weight || !height) return;
    const heightMeters = height / 100;
    const bmiValue = weight / (heightMeters * heightMeters);
    setBMI(bmiValue.toFixed(2));
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="weight">
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            className={styles.quantityInput}
          />
        </div>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="height">
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
            className={styles.quantityInput}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.calcButton} onClick={calculateBMI}>
          Calculate
        </button>
        <button className={styles.calcButton} onClick={resetCalculator}>
          Reset
        </button>
      </div>
      {bmi !== null && (
        <div className={styles.input}>
          <label className={styles.label} htmlFor="bmi">
            BMI:
          </label>
          <input
            type="text"
            id="bmi"
            value={bmi}
            readOnly
            className={styles.caloriesInput}
          />
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
