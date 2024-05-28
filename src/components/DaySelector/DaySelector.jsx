import React from "react";
import styles from "./DaySelector.module.css";
import { useTranslation } from "react-i18next";

const DaySelector = ({ selectedDay, handleDaySelect }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.dayOfWeekContainer}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <button
          key={day}
          className={`${styles.dayCircle} ${
            selectedDay === day ? styles.selected : ""
          }`}
          onClick={() => handleDaySelect(day)}
        >
          {t(day)}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;