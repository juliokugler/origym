// React
import React, { useState, useEffect } from "react";

// Styles
import styles from "./HealthPage.module.css";
import classNames from "classnames";

//Components
import Header from "../../components/Header/Header";

//Page Components
import BMICalculator from "./components/BMICalculator/BMICalculator";
import HealthTips from "./components/HealthTips/HealthTips";
import WeightTracker from "./components/TrackerComponents/WeightTracker/WeightTracker";
import DailySummary from "./components/DailySummary/DailySummary";

const HealthPage = ({ t, userData, user, dailyInfo, isMobile }) => {
  if (user && !userData || user && !dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  return (
    <div className={!isMobile ? "container" : "container-mobile"}>
      <Header isMobile={isMobile} userData={userData} t={t} pageType="health" />
      {!isMobile ? (<div className="mainSection">
        <div className={styles.firstColumn}>
          <div className={classNames("mainCard", styles.weightTracker)}>
            <h3 className={styles.title2}>{t("weightTracker")}</h3>
            <WeightTracker  t={t} />
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
     ) : (<div className="mainSection-mobile">
       
          <div className={classNames("mainCard", styles.weightTracker_mobile)}>
            <h3 className={styles.title2}>{t("weightTracker")}</h3>
            <WeightTracker isMobile={isMobile} t={t} />
            <h3>{t("currentWeight")}:</h3>
            <button>{t("update")}</button>
        
</div>
          <div className={classNames("card", styles.calculator_mobile)}>
            <h3 className="title">{t("BMICalculator")}</h3>
            <BMICalculator isMobile={isMobile} t={t} />
          </div>
        

        
          <div className={classNames("card", styles.dailySummary_mobile)}>
            <h3 className="title">{t("dailySummary")}</h3>
            <DailySummary isMobile={isMobile} t={t} />
          
        </div>

        
          <div className={classNames("card", styles.healthTips_mobile)}>
            <h3 className="title">{t("healthTips")}</h3>
            <HealthTips isMobile={isMobile} t={t} />
          </div>
       
      </div>)}
    </div>
  );
};

export default HealthPage;
