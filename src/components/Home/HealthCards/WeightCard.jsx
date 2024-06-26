import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";
import weight from "../../../assets/Icons/weight.png";
import classNames from "classnames";
import styles from "./CardsContainer.module.css";

const WeightCard = ({ user, dailyInfo, userData, t, onUserInfoChange, isMobile }) => {
  const [showInput, setShowInput] = useState(false);
  const [newWeight, setNewWeight] = useState(userData.userProfile.currentWeight);

  if (!dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  console.log(userData);

  const handleWeightChange = (e) => {
    setNewWeight(e.target.value);
  };

  const handleWeightSubmit = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}`);

    try {
      await updateDoc(dailyInfoRef, {
        currentWeight: parseFloat(newWeight),
      });
      console.log("Weight updated successfully.");
      onUserInfoChange();
      setShowInput(false);
    } catch (error) {
      console.error("Error updating weight:", error);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div className={classNames("card", "healthCard")}>
          <img
            className="healthIcon"
            src={weight}
            alt="weight scale"
          />
          <div className="healthInfo">
            <h3>
              {showInput ? "" : <h2>{newWeight}</h2>}
            </h3>
            {showInput && (
              <div className={styles.weightInput}>
                <input
                  type="number"
                  min="0"
                  value={newWeight}
                  onChange={handleWeightChange}
                />
                <button className="button-small" onClick={handleWeightSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showInput ? dots : dotsActive}
              alt="dots menu"
               className="dots"
              onClick={() => setShowInput(!showInput)}
            />
            {!showInput && (
              userData.userProfile.weightGoal > 0 ? (
                <p>{`/${userData.userProfile.weightGoal} Kgs`}</p>
              ) : (<p>Kgs</p>)
            )}
          </div>
        </div>
      ) : (
        <div className={classNames("card", "healthCard_mobile")}>
          
          <div className="healthInfo_mobile">
          <img
            className="healthIcon_mobile"
            src={weight}
            alt="weight scale"
          />
            <h3>
              {showInput ? "" : <h2>{newWeight}</h2>}
            </h3>
            {showInput && (
              <div className={styles.weightInput}>
                <input
                  type="number"
                  min="0"
                  value={newWeight}
                  onChange={handleWeightChange}
                />
                <button className="button-small" onClick={handleWeightSubmit}>{t("submit")}</button>
              </div>
            )}
            <img
              src={showInput ? dots : dotsActive}
              alt="dots menu"
               className="dots"
              onClick={() => setShowInput(!showInput)}
            />
            {!showInput && (
              userData.userProfile.weightGoal > 0 ? (
                <p>{`/${userData.userProfile.weightGoal} Kgs`}</p>
              ) : (<p>Kgs</p>)
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WeightCard;