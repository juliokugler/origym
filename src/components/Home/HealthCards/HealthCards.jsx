import React, { useState } from "react";
import styles from "./HealthCards.module.css";
import steps from "../../../assets/Icons/steps.png";
import bpm from "../../../assets/Icons/bpm.png";
import sleep from "../../../assets/Icons/sleep.png";
import weight from "../../../assets/Icons/weight.png";
import water from "../../../assets/Icons/water.png";
import dots from "../../../assets/Icons/DotsThreeVertical.png";
import dotsActive from "../../../assets/Icons/DotsThreeVertical_inactive.png";

const HealthCards = ({ userData, t }) => {
  const [hoveredCards, setHoveredCards] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleCardMouseEnter = (index) => {
    const updatedHoveredCards = [...hoveredCards];
    updatedHoveredCards[index] = true;
    setHoveredCards(updatedHoveredCards);
  };

  const handleCardMouseLeave = (index) => {
    const updatedHoveredCards = [...hoveredCards];
    updatedHoveredCards[index] = false;
    setHoveredCards(updatedHoveredCards);
  };

  const currentWeight = userData.userProfile.weightGoal

  return (
    <div className={styles.card}>
      <div className={styles.healthCardContainer}>
        <div className={styles.row}>
          {[
            {
              icon: steps,
              label: "Steps",
              value: "4500",
              goal: `/10000 ${t("steps")}`,
            },
            {
              icon: water,
              label: "Water",
              value: "1.2",
              goal: `/${userData.userProfile.waterIntake} ${t("liters")}`,
            },
            {
              icon: weight,
              label: "Weight",
              value: `${userData.userProfile.currentWeight}`,
              goal: `${currentWeight > 0 ? (`/${currentWeight}`) : ""} Kgs`,
            },
            { icon: bpm, label: "BPM", value: "78", goal: "bpm" },
            {
              icon: sleep,
              label: "Sleep",
              value: "5h35m",
              goal: `/8 ${t("hours")}`,
            },
          ].map((card, index) => (
            <div key={index} className={styles.healthCard}>
              <img
                className={styles.icon}
                src={card.icon}
                alt={card.label}
              ></img>
              <div className={styles.healthInfo}>
                <h3>{card.value}</h3>
                <img
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  src={hoveredCards[index] ? dots : dotsActive}
                  alt="dots menu"
                ></img>
                <p>{card.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCards;
