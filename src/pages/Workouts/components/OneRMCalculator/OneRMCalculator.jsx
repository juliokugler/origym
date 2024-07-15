import React, { useState } from "react";
import styles from "./OneRMCalculator.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useOneRMCalculator from "../../../../hooks/useOneRMCalculator";
import Popup from "./Popup";

const OneRMCalculator = ({ onOneRMChange, t }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { oneRMResults, error, calculateOneRM } = useOneRMCalculator(weight, reps, t);

  const handleWeightChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, "");
    setWeight(value);
  };

  const handleRepsChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, "");
    setReps(value);
  };

  const handleReset = () => {
    setWeight("");
    setReps("");
  };

  const isCalculateEnabled = weight > 0 && reps > 0;

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="weight">
            <p>{t("weightLabel")}:</p>
          </label>
          <input
            type="number"
            id="weight"
            min="0"
            value={weight}
            onChange={handleWeightChange}
            pattern="[0-9]*"
            className={styles.inputField}
          />
        </div>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="reps">
            <p>{t("reps")}:</p>
          </label>
          <input
            type="number"
            id="reps"
            min="0"
            value={reps}
            onChange={handleRepsChange}
            pattern="[0-9]*"
            className={styles.inputField}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={calculateOneRM}
          className={classNames({
            "inactiveButton-medium": !isCalculateEnabled,
            button: isCalculateEnabled,
          })}
          disabled={!isCalculateEnabled}
        >
          <p>{t("calculate")}</p>
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {oneRMResults.length > 0 && (
        <div>
          <div className={styles.oneRMResult}>
            <h2>~ {oneRMResults[0].value} kg</h2>
        
          <button
            className="notSelectedButton-medium"
            onClick={() => setShowPopup(true)}
          >
            {t("showMore")}
          </button>  </div>
        </div>
      )}
      {showPopup && (
        <Popup
          results={oneRMResults}
          onClose={() => setShowPopup(false)}
          t={t}
        />
      )}
    </div>
  );
};

export default OneRMCalculator;