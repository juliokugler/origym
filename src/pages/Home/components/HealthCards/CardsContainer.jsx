//React
import React from "react";

//Styles
import styles from "./CardsContainer.module.css";

//Page Components
import WaterIntakeCard from "./WaterIntakeCard";
import StepsCounterCard from "./StepsCounterCard";
import HeartRateCard from "./HeartRateCard";
import WeightCard from "./WeightCard";
import SleepCard from "./SleepCard";

const CardsContainer = ({ user, userData, dailyInfo, t, onUserInfoChange, isMobile}) => {
 

  if (!userData) {
    return <p>{t("loading")}...</p>;
  }

  return (<>
    {!isMobile? (
    <div className={styles.card}>
      <div className={styles.healthCardContainer}>
        <div className={styles.row}>
        
        <StepsCounterCard  onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WaterIntakeCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WeightCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <HeartRateCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <SleepCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        </div>
      </div>
    </div>):(

<div className={styles.mobileCard}>
      <div className={styles.mobileHealthCardContainer}>
        <div className={styles.mobileColumn}>
        
        <StepsCounterCard isMobile={isMobile}  onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WaterIntakeCard  isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WeightCard isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <HeartRateCard isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <SleepCard isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        </div>
      </div>
    </div>

    )}</>
  );
};

export default CardsContainer;