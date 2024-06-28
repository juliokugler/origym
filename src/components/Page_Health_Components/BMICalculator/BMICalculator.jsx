import React, { useState } from "react";
import classNames from "classnames";
import styles from "./BMICalculator.module.css";
import { useTranslation } from "react-i18next";

const BMICalculator = ({ t, isMobile }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);

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

  const isCalculateEnabled = weight > 0 && height > 0;

  return (
    <div className={styles.content}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="weight">
            {t("weightLabel")}:
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
            {t("heightLabel")}:
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
        <button
          className={classNames({
            "inactiveButton-medium": !isCalculateEnabled,
            "button": isCalculateEnabled,
          })}
          onClick={calculateBMI}
          disabled={!isCalculateEnabled}
        >
          {t("calculate")}
        </button>
        <button className="inactiveButton-medium" onClick={resetCalculator}>
          {t("reset")}
        </button>
      </div>
      {bmi !== null && (
        <div className={styles.bmiResult}>
        <h2>~ {bmi} {t("bmi")}</h2>
      </div>
      )}
    </div>
  );
};

export default BMICalculator;