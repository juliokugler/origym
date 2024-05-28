import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";
import ExerciseList from "../../ExerciseList/ExerciseList";

const PopupContainer = ({ workout, onClose }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedDay, setSelectedDay] = useState([]);
  const getCurrentDay = () => {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[today.getDay()];
  };

  React.useEffect(() => {
    setSelectedDay(getCurrentDay());
  }, []);

  useEffect(() => {
    console.log("Workout:", workout);
    if (workout.days) {
      console.log("Selected days:", workout.days);
      setSelectedDay(workout.days);
    }
  }, [workout]);

  // Extract exercise list from workout object
  const exercises = workout.exercises || [];

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <div className={styles.exerciseContainer}>
          <div className={styles.dayOfWeekContainer}>
            {days.map((day, index) => (
              <div
                key={index}
                className={`${styles.dayCircle} ${
                  selectedDay.includes(day) ? styles.active : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          {/* Pass exercises and favoriteList props to ExerciseList */}
          <ExerciseList exercises={[workout]} favoriteList={[]} />
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupContainer;
