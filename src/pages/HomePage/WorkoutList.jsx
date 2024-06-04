import React, { useState, useEffect } from "react";
import styles from "./WorkoutList.module.css";
import ExerciseList from "./HomeExerciseList";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

const WorkoutList = ({ workouts, onOpen, user, onCheck, dailyInfo, setDailyInfo, onUserInfoChange }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { t } = useTranslation();

  const getCurrentDay = () => {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[today.getDay()];
  };

  useEffect(() => {
    setSelectedDay(getCurrentDay());
  }, []);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleOpenCreateWorkout = () => {
    onOpen(selectedDay);
  };

  // Filter workouts based on the selected day
  const filteredWorkouts = workouts.filter((workout) =>
    workout.days.includes(selectedDay)
  );

  return (
    <div className={styles.card}>
      <ExerciseList
        exercises={filteredWorkouts}
        user={user}
        onCheck={onCheck}
        dailyInfo={dailyInfo}
        setDailyInfo={setDailyInfo}
        onUserInfoChange={onUserInfoChange}
      />
    </div>
  );
};

export default WorkoutList;