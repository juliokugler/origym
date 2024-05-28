// React
import React, { useState, useEffect } from "react";

// Styles
import styles from "./HealthPage.module.css";
import classNames from "classnames";

// Components
import Header from "../../components/Header/Header";
import BMICalculator from "../../components/Health/BMICalculator/BMICalculator";
import HealthTips from "../../components/Health/HealthTips/HealthTips";
import WeightTracker from "../../components/Health/WeightTracker/WeightTracker";
import DailySummary from "../../components/Health/DailySummary/DailySummary";

const HealthPage = ({ t }) => {
  return (
    <div className="container">
      <Header t={t} pageType="health" />
      <div className="mainSection">
        <div className={styles.firstColumn}>
          <div className={classNames("mainCard", styles.weightTracker)}>
            <h3 className={styles.title2}>Weight Tracker</h3>
            <WeightTracker />
            <h3>Current Weight:</h3>
            <button>Update</button>
          </div>

          <div className={classNames("card", styles.calculator)}>
            <h3 className="title">BMI Calculator</h3>
            <BMICalculator />
          </div>
        </div>

        <div className={styles.secondColumn}>
          <div className={classNames("card", styles.dailySummary)}>
            <h3 className="title">Daily Summary</h3>
            <DailySummary />
          </div>
        </div>

        <div className={styles.thirdColumn}>
          <div className={classNames("card", styles.healthTips)}>
            <h3 className="title">Health Tips</h3>
            <HealthTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
