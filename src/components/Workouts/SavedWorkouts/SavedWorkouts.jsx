//React
import React, { useState } from "react";

//Styles
import styles from "./SavedWorkouts.module.css";

//Translation Hook
import { useTranslation } from "react-i18next";

//Components
import WorkoutCard from "./Popup/Popup";

const SavedWorkouts = ({ workouts, onOpen }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutCard, setShowWorkoutCard] = useState(false);
  const { t } = useTranslation();

  const openWorkoutDetails = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutCard(true);
  };

  const closeWorkoutDetails = () => {
    setSelectedWorkout(null);
    setShowWorkoutCard(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workoutList}>
        {workouts.map((workout) => (
          <div key={workout.id} className={styles.workoutCard}>
            <h3>
              {workout.name}
              <br />
              <div className={styles.muscleList}>
                {workout.muscleGroups.map((group, index) => (
                  <p key={index}>
                    {group}
                    {index !== workout.muscleGroups.length - 1 && ", "}
                  </p>
                ))}
              </div>
            </h3>
            <div
              className={styles.addButton}
              onClick={() => openWorkoutDetails(workout)}
            >
              <u>{t("viewDetails")}</u>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.createButton} onClick={onOpen}>
        {t("createWorkout")}
      </button>
      {showWorkoutCard && selectedWorkout && (
        <div className={styles.popup}>
          <WorkoutCard
            workout={selectedWorkout}
            onClose={closeWorkoutDetails}
          />
        </div>
      )}
    </div>
  );
};

export default SavedWorkouts;
