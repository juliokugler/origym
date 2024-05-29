import React, { useState, useEffect } from "react";
import styles from "./DailySummary.module.css";
import { useTranslation } from "react-i18next";
import arrowDown from "../../../assets/Icons/CircleArrowDown.png";
import arrowUp from "../../../assets/Icons/CircleArrowUp.png";
import SleepTracker from "./TrackerComponents/SleepTracker/SleepTracker";
import HydrationTracker from "./TrackerComponents/HydrationTracker/HydrationTracker";
import StepsTracker from "./TrackerComponents/StepsTracker/StepsTracker";
import WeightTracker from "./TrackerComponents/WeightTracker/WeightTracker";
import HeartRateTracker from "./TrackerComponents/HeartRateTracker/HeartRateTracker";

const DailySummary = ({t}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [openCardIndex, setOpenCardIndex] = useState(0);

  useEffect(() => {
    const getCurrentDay = () => {
      const today = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[today.getDay()];
    };

    setSelectedDay(getCurrentDay());
  }, []);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const toggleCardContainer = (index) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  
  const cardTitles = [
    t("sleepTracker"),
    t("hydrationTracker"),
    t("stepsTracker"),
    t("weightTracker"),
    t("heartRateTracker"),
  ];

  const trackerComponents = [
    <SleepTracker t={t}/>,
    <HydrationTracker t={t} />,
    <StepsTracker t={t} />,
    <WeightTracker t={t} />,
    <HeartRateTracker t={t} />,
  ];

  return (
    <div className={styles.card}>
      {selectedDay && (
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            <ul className={styles.cardsList}>
              {cardTitles.map((title, cardIndex) => {
                const isOpen = openCardIndex === cardIndex;
                return (
                  <li key={cardIndex}>
                    <div
                      className={isOpen ? styles.cardOpened : styles.cardClosed}
                      onClick={() => toggleCardContainer(cardIndex)}
                    >
                      <div className={styles.titleAndIcon}>
                        <h4>{title}</h4>
                        <img
                          className={styles.arrowIcon}
                          src={isOpen ? arrowUp : arrowDown}
                          alt={isOpen ? "Arrow Up" : "Arrow Down"}
                        />
                      </div>
                      {isOpen && trackerComponents[cardIndex]}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySummary;
