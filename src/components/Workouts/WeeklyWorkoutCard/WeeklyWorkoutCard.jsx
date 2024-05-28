import React, { useState, useEffect } from "react";
import styles from "./WeeklyWorkoutCard.module.css";
import ExerciseList from "../ExerciseList/ExerciseList";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import DaySelector from "../../DaySelector/DaySelector";

const WeeklyWorkoutCard = ({ workouts, onOpen, onFavoriteToggle, user }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [number, setNumber] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedDay(getCurrentDay());
  }, []);

  const getCurrentDay = () => {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[today.getDay()];
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setNumber(null);
  };

  const handleOpenCreateWorkout = () => {
    onOpen(selectedDay);
  };

  // Filter workouts based on the selected day
  const filteredWorkouts = workouts.filter((workout) =>
    workout.days.includes(selectedDay)
  );

  useEffect(() => {
    const workoutNumber = filteredWorkouts.length;
    console.log("filtered:", filteredWorkouts);
    if (workoutNumber === 1) {
      setNumber(0);
    } else {
      setNumber(null);
    }
  }, [filteredWorkouts, selectedDay]);

  return (
    <div className={styles.exerciseContainer}>
      <DaySelector selectedDay={selectedDay} handleDaySelect={handleDaySelect} />
      <ExerciseList
        exercises={filteredWorkouts}
        number={number}
        onChange={setNumber}
        onFavoriteToggle={onFavoriteToggle}
        user={user}
      />
      <button className={styles.addButton} onClick={handleOpenCreateWorkout}>
        <FaPlus />
      </button>
    </div>
  );
};

export default WeeklyWorkoutCard;