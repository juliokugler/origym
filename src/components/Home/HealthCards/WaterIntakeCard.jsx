import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import water from "../../../assets/Icons/water.png";
import classNames from "classnames";

const WaterIntakeCard = ({ user, dailyInfo, userData, t, onUserInfoChange }) => {
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
      setShowSlider(false); // Hide the slider after submitting
    } catch (error) {
      console.error("Error updating water consumption:", error);
    }
  };

  return (

 
   
          <div className={classNames("card", "healthCard")}>
            <img
              className="healthIcon"
              src={water}
              alt="Water"
            />
            <div className="healthInfo">
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
                onClick={() => setShowSlider(!showSlider)}
              />
              {!showSlider && (
                <p>{`/ ${userData.userProfile.waterIntake} ${t("liters")}`}</p>
              )}
            </div>
          </div>
 
     
   
  );
};

export default WaterIntakeCard;