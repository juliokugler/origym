import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import weight from "../../../assets/Icons/weight.png";
import classNames from "classnames";

const WeightCard = ({ user, dailyInfo, userData, t, onUserInfoChange }) => {
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
              src={weight}
              alt="weight scale"
            />
            <div className="healthInfo">
              <h2>
             {userData.userProfile.weight}
                            </h2>
             
              <img
                src={showSlider ? dots : dotsActive}
                alt="dots menu"
                onClick={() => setShowSlider(!showSlider)}
              />
              {userData.userProfile.weightGoal > 0 ? (
                <p>{`/${userData.userProfile.weightGoal} Kgs`}</p>
              ) : (<p>Kgs</p>)}
            </div>
          </div>
       
     
   
  );
};

export default WeightCard;