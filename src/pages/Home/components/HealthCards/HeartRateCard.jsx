//React
import React, { useState } from "react";

//Styles
import styles from "./HealthCards.module.css"

//Firebase
import { updateDoc, doc, getFirestore } from "firebase/firestore";

//Dependencies
import classNames from "classnames";

//Icons
import dots from "../../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../../assets/Icons/DotsThreeVertical_inactive.png";
import bpm from "../../../../assets/Icons/bpm.png";

const HeartRateCard = ({ user, dailyInfo, userData, t, onUserInfoChange, isMobile }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [newHeartRate, setNewHeartRate] = useState(dailyInfo.heartRate || 75);

  if (!dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  const handleHeartRateChange = (event) => {
    setNewHeartRate(event.target.value);
  };

  const handleHeartRateSubmit = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await updateDoc(dailyInfoRef, {
        heartRate: parseFloat(newHeartRate),
      });
      console.log("Heart rate updated successfully.");
      onUserInfoChange();
      setShowSlider(false);
    } catch (error) {
      console.error("Error updating heart rate:", error);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div className={classNames("card", styles.healthCard)}>
          <img
            className={styles.healthIcon}
            src={bpm}
            alt="Heart Rate"
          />
          <div className={styles.healthInfo}>
            <h2>{newHeartRate}</h2>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="40"
                  max="180"
                  step="1"
                  value={newHeartRate}
                  onChange={handleHeartRateChange}
                />
                <button className="button-small" onClick={handleHeartRateSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
              className={styles.dots}
              onClick={() => setShowSlider(!showSlider)}
            />
            {!showSlider && <p>bpm</p>}
          </div>
        </div>
      ) : (
        <div className={classNames("card", styles.healthCard_mobile)}>
          
          <div className={styles.healthInfo_mobile}><img
            className={styles.healthIcon_mobile}
            src={bpm}
            alt="Heart Rate"
          />
            <h2>{newHeartRate}</h2>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="40"
                  max="180"
                  step="1"
                  value={newHeartRate}
                  onChange={handleHeartRateChange}
                />
                <button className="button-small" onClick={handleHeartRateSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
               className={styles.dots}
              onClick={() => setShowSlider(!showSlider)}
            />
            {!showSlider && <p>bpm</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default HeartRateCard;