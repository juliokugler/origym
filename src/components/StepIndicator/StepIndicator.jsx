import React from "react";
import classNames from "classnames";
import styles from "./StepIndicator.module.css";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={classNames(styles.dot, {
            [styles.activeDot]: step === currentStep,
          })}
        />
      ))}
    </div>
  );
};

export default StepIndicator;