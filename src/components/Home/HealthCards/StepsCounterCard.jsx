import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import steps from "../../../assets/Icons/steps.png";
import classNames from "classnames";

const StepsCounterCard = ({ user, dailyInfo, userData, t, onUserInfoChange, isMobile }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [newStepsTaken, setNewStepsTaken] = useState(dailyInfo.stepsTaken);

 if (!dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  const handleStepsChange = (event) => {
    setNewStepsTaken(event.target.value);
  };

  const handleStepsSubmit = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await updateDoc(dailyInfoRef, {
        stepsTaken: parseFloat(newStepsTaken),
      });
      console.log("Water consumption updated successfully.");
      onUserInfoChange();
      setShowSlider(false); // Hide the slider after submitting
    } catch (error) {
      console.error("Error updating water consumption:", error);
    }
  };

  return (<> {!isMobile? (
          <div className={classNames("card", "healthCard")}>
            <img
              className="healthIcon"
              src={steps}
              alt="Steps"
            />
            <div className="healthInfo">
              <h3>
                {showSlider
                  ? `${newStepsTaken}K / 10K ${t("steps")}`
                  : <h2>{newStepsTaken}K</h2>}
              </h3>
              {showSlider && (
                <div className="slider">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={newStepsTaken}
                    onChange={handleStepsChange}
                  />
                  <button className="button-small" onClick={handleStepsSubmit}>{t("submit")}</button>
                </div>
              )}
              <img
                src={showSlider ? dots : dotsActive}
                className="dots"
                alt="dots menu"
                onClick={() => setShowSlider(!showSlider)}
              />
              {!showSlider && (
                <p>{`/ 10K ${t("steps")}`}</p>
              )}
            </div>
          </div>): (<div className={classNames("card", "healthCard_mobile")}>
            
            <div className="healthInfo_mobile"><img
              className="healthIcon_mobile"
              src={steps}
              alt="Steps"
            />
              <h3>
                {showSlider
                  ? `${newStepsTaken}K / 10K ${t("steps")}`
                  : <h2>{newStepsTaken}</h2>}
              </h3>
              {showSlider && (
                <div className="slider">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={newStepsTaken}
                    onChange={handleStepsChange}
                  />
                  <button className="button-small" onClick={handleStepsSubmit}>{t("submit")}</button>
                </div>
              )}
              <img
                src={showSlider ? dots : dotsActive}
                alt="dots menu"
                onClick={() => setShowSlider(!showSlider)}
                className="dots"
              />
              {!showSlider && (
                <p>{`/ 10K`}</p>
              )}
            </div>
          </div>)
          }</>
 
     
   
  );
};

export default StepsCounterCard;