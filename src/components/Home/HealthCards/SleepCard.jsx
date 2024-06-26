import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import sleep from "../../../assets/Icons/sleep.png";
import classNames from "classnames";

const SleepCard = ({ user, dailyInfo, userData, t, onUserInfoChange, isMobile }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [newSleepHours, setNewSleepHours] = useState(dailyInfo.sleepHours || 0);

  if (!dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  const handleSleepChange = (event) => {
    setNewSleepHours(event.target.value);
  };

  const handleSleepSubmit = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await updateDoc(dailyInfoRef, {
        sleepHours: parseFloat(newSleepHours),
      });
      console.log("Sleep hours updated successfully.");
      onUserInfoChange();
      setShowSlider(false); // Hide the slider after submitting
    } catch (error) {
      console.error("Error updating sleep hours:", error);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div className={classNames("card", "healthCard")}>
          <img
            className="healthIcon"
            src={sleep}
            alt="Sleep"
          />
          <div className="healthInfo">
            <h3>
              {showSlider
                ? `${newSleepHours} / 8 ${t("hours")}`
                : <h2>{newSleepHours}h</h2>}
            </h3>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={newSleepHours}
                  onChange={handleSleepChange}
                />
                <button className="button-small" onClick={handleSleepSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
              onClick={() => setShowSlider(!showSlider)}
               className="dots"
            />
            {!showSlider && (
              <p>{`/ 8 ${t("hours")}`}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={classNames("card", "healthCard_mobile")}>
        
          <div className="healthInfo_mobile">  <img
            className="healthIcon_mobile"
            src={sleep}
            alt="Sleep"
          />
            <h3>
              {showSlider
                ? `${newSleepHours}/ 8 ${t("hours")}`
                : <h2>{newSleepHours}</h2>}
            </h3>
            {showSlider && (
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={newSleepHours}
                  onChange={handleSleepChange}
                />
                <button className="button-small" onClick={handleSleepSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showSlider ? dots : dotsActive}
              alt="dots menu"
              onClick={() => setShowSlider(!showSlider)}
               className="dots"
            />
            {!showSlider && (
              <p>{`/8H`}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SleepCard;