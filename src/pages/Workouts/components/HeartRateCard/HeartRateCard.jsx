import React, { useState } from "react";
import styles from "./HeartRateCard.module.css";
import HeartRate from "./HeartRate";

const HeartRateCard = ({user, t}) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const handleUpdatePopup = () => {
    setShowUpdatePopup((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <HeartRate user={user}/>
      <div className={styles.heartInfoContainer}>
        <div className={styles.heartInfo}>
          <p>128</p> <h4>Peak</h4>
        </div>

        <div className={styles.heartInfo}>
          <p>110</p> <h4>Training</h4>
        </div>
        <div className={styles.heartInfo}>
          <p>75</p> <h4>Baseline</h4>
        </div>
      </div>
    </div>
  );
};

export default HeartRateCard;
