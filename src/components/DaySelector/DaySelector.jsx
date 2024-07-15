import React from "react";
import styles from "./DaySelector.module.css";
import { useTranslation } from "react-i18next";

const DaySelector = ({ selectedDay, selectedDays, handleDaySelect }) => {
  const { t } = useTranslation();

  
  const isMultiSelect = Array.isArray(selectedDays);

  return (
    <div className={styles.dayOfWeekContainer}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <button
          key={day}
          className={`${styles.dayCircle} ${
            (isMultiSelect && selectedDays.includes(day)) ||
            (!isMultiSelect && selectedDay === day)
              ? styles.selected
              : ""
          }`}
          onClick={() => handleDaySelect(day)}
        >
         <p> {t(day)}</p>
        </button>
      ))}
    </div>
  );
};

export default DaySelector;