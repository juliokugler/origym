//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./OneRMCalculator.module.css";
import classNames from "classnames"

//Translation Hook
import { useTranslation } from "react-i18next";

//Custom Hooks
import useOneRMCalculator from "../../../hooks/useOneRMCalculator";

const OneRMCalculator = ({ onOneRMChange }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [showOneRMButton, setShowOneRMButton] = useState(false);
  const { t } = useTranslation();
  const { oneRMResult, error, calculateOneRM } = useOneRMCalculator(
    weight,
    reps,
    t
  );

  useEffect(() => {
    setShowOneRMButton(false);
  }, [weight, reps]);

  const handleWeightChange = (event) => {
    let value = event.target.value;
    value = value.replace(/a[^0-9]/g, "");
    if (value.length <= 3) {
      setWeight(value);
    }
  };

  const handleRepsChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length <= 2) {
      setReps(value);
    }
  };

  const handleAddOneRMStats = () => {
    onOneRMChange(oneRMResult);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label htmlFor="weight"> <p>{t("weightLabel")}:</p></label>
          <input
            type="number"
            id="reps"
            min="0"
            value={weight}
            onChange={handleWeightChange}
            pattern="[0-9]*"
            className={styles.inputField}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="reps"><p>{t("reps")}:</p></label>
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
      <button
        onClick={calculateOneRM}
        className={classNames({
          inactiveButton: weight === "" || reps === "",
          button: weight !== "" && reps !== "",
        })}
      >
        <p>{t("calculate")}</p>
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {oneRMResult && (
        <div className={styles.oneRMResult}>
          <h2>~ {oneRMResult} kg </h2>
        </div>
      )}
    </div>
  );
};

export default OneRMCalculator;
