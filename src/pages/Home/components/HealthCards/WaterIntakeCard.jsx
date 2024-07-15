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
import water from "../../../../assets/Icons/water.png";

const WaterIntakeCard = ({ user, dailyInfo, userData, t, onUserInfoChange, isMobile }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [newWaterConsumed, setNewWaterConsumed] = useState(dailyInfo.waterConsumed);

  console.log(user)

  if (!dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  const handleWaterChange = (event) => {
    setNewWaterConsumed(event.target.value);
  };

  const handleWaterSubmit = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await updateDoc(dailyInfoRef, {
        waterConsumed: parseFloat(newWaterConsumed),
      });
      console.log("Water consumption updated successfully.");
      onUserInfoChange();
      setShowSlider(false);
    } catch (error) {
      console.error("Error updating water consumption:", error);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div className={classNames("card", styles.healthCard)}>
          <img
            className={styles.healthIcon}
            src={water}
            alt="Water"
          />
          <div className={styles.healthInfo}>
            <h3>
              {showSlider
                ? `${newWaterConsumed} / ${userData.userProfile.waterIntake} ${t("liters")}`
                : <h2>{newWaterConsumed}L</h2>}
            </h3>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max={userData.userProfile.waterIntake}
                  step="0.1"
                  value={newWaterConsumed}
                  onChange={handleWaterChange}
                />
                <button className="button-small" onClick={handleWaterSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
               className={styles.dots}
              onClick={() => setShowSlider(!showSlider)}
            />
            {!showSlider && (
              <p>{`/ ${userData.userProfile.waterIntake} ${t("liters")}`}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={classNames("card", styles.healthCard_mobile)}>
          
          <div className={styles.healthInfo_mobile}><img
            className={styles.healthIcon_mobile}
            src={water}
            alt="Water"
          />
            <h3>
              {showSlider
                ? `${newWaterConsumed} / ${userData.userProfile.waterIntake} ${t("liters")}`
                : <h2>{newWaterConsumed}</h2>}
            </h3>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max={userData.userProfile.waterIntake}
                  step="0.1"
                  value={newWaterConsumed}
                  onChange={handleWaterChange}
                />
                <button className="button-small" onClick={handleWaterSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
               className={styles.dots}
              onClick={() => setShowSlider(!showSlider)}
            />
            {!showSlider && (
              <p>{`/${userData.userProfile.waterIntake}L`}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WaterIntakeCard;