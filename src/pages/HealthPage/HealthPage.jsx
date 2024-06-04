// React
import React, { useState, useEffect } from "react";

// Styles
import styles from "./HealthPage.module.css";
import classNames from "classnames";

// Components
import Header from "../../components/Header/Header";
import BMICalculator from "../../components/Health/BMICalculator/BMICalculator";
import HealthTips from "../../components/Health/HealthTips/HealthTips";
import WeightTracker from "../../components/Health/DailySummary/TrackerComponents/WeightTracker/WeightTracker";
import DailySummary from "../../components/Health/DailySummary/DailySummary";

const HealthPage = ({ t, userData, user, dailyInfo }) => {
  if (user && !userData || user && !dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  return (
    <div className="container">
      <Header t={t} pageType="health" />
      <div className="mainSection">
        <div className={styles.firstColumn}>
          <div className={classNames("mainCard", styles.weightTracker)}>
            <h3 className={styles.title2}>{t("weightTracker")}</h3>
            <WeightTracker t={t} />
            <h3>{t("currentWeight")}:</h3>
            <button>{t("update")}</button>
          </div>

          <div className={classNames("card", styles.calculator)}>
            <h3 className="title">{t("BMICalculator")}</h3>
            <BMICalculator t={t} />
          </div>
        </div>

        <div className={styles.secondColumn}>
          <div className={classNames("card", styles.dailySummary)}>
            <h3 className="title">{t("dailySummary")}</h3>
            <DailySummary t={t} />
          </div>
        </div>

        <div className={styles.thirdColumn}>
          <div className={classNames("card", styles.healthTips)}>
            <h3 className="title">{t("healthTips")}</h3>
            <HealthTips t={t} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
