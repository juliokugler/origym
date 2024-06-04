import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import bpm from "../../../assets/Icons/bpm.png"
import classNames from "classnames";

const HeartRateCard = ({ user, dailyInfo, userData, t, onUserInfoChange }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [newWaterConsumed, setNewWaterConsumed] = useState(dailyInfo.waterConsumed);

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
              src={bpm}
              alt="bpm"
            />
            <div className="healthInfo">
              <h2>
           75
              </h2>
              
              <img
                src={showSlider ? dots : dotsActive}
                alt="dots menu"
                onClick={() => setShowSlider(!showSlider)}
              />
           
                <p>bpm</p>
          
            </div>
          </div>

     
   
  );
};

export default HeartRateCard;