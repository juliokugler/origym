import React, { useState, useEffect } from "react";
import styles from "./DailySummary.module.css";
import { useTranslation } from "react-i18next";
import arrowDown from "../../../assets/Icons/CircleArrowDown.png";
import arrowUp from "../../../assets/Icons/CircleArrowUp.png";
import SleepTracker from "../SleepTracker/SleepTracker";
import HydrationTracker from "../HydrationTracker/HydrationTracker";
import StepsTracker from "../StepsTracker/StepsTracker";
import WeightTracker from "../WeightTracker/WeightTracker";
import HeartRateTracker from "../HeartRateTracker/HeartRateTracker";

const DailySummary = ({ onOpen, rerender }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { t } = useTranslation();
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
    "Sleep Tracker",
    "Hydration Tracker",
    "Steps Tracker",
    "Weight Tracker",
    "Heart Rate Tracker",
  ];

  const trackerComponents = [
    <SleepTracker />,
    <HydrationTracker />,
    <StepsTracker />,
    <WeightTracker />,
    <HeartRateTracker />,
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
