import React, { useState, useEffect } from "react";
import styles from "./ExerciseList.module.css";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import strengthIcon from "../../../assets/Icons/strength.png";
import cardioIcon from "../../../assets/Icons/cardio.png";
import arrowDown from "../../../assets/Icons/CircleArrowDown.png";
import arrowUp from "../../../assets/Icons/CircleArrowUp.png";
import { FaFire } from "react-icons/fa";

const ExerciseList = ({
  exercises,
  number,
  onChange,
  onFavoriteToggle,
  user,
  currentLanguage,
  t,
  isMobile
}) => {
  const [openWorkoutIndex, setOpenWorkoutIndex] = useState(null);
  const [doneExercises, setDoneExercises] = useState(0);
  const [newNumber, setNewNumber] = useState(null);
console.log(isMobile)
  useEffect(() => {
    if (number !== null) {
      setOpenWorkoutIndex(number);
      onChange(newNumber);
    }
  }, [number]);

  const getIconByType = (type) => {
    switch (type) {
      case "Strength":
        return strengthIcon;
      case "Cardio":
        return cardioIcon;
     
      default:
        return strengthIcon;
    }
  };

  const handleExerciseCheck = (done) => {
    setDoneExercises(done);
  };

  const toggleWorkoutContainer = (index) => {
    setOpenWorkoutIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={!isMobile? styles.container : styles.container_mobile}>
      {!exercises || exercises.length === 0 ? (
        <div className={styles.noWorkoutsMessage}>
          <p>
            {t("noWorkoutsScheduled")}
          </p>
        </div>
      ) : null}

      {exercises && exercises.length > 0 && (
        <ul className={styles.exerciseList}>
          {exercises.map((workout, index) => {
            const isOpen = openWorkoutIndex === index;
            return (
              
              <div
              key={index}
              className={
                isOpen && isMobile
                  ? styles.exerciseCardOpened_mobile
                  : isOpen && !isMobile
                  ? styles.exerciseCardOpened
                  : !isOpen && isMobile
                  ? styles.exerciseCardClosed_mobile
                  : styles.exerciseCardClosed
              }
            >
                <div
                  onClick={() => toggleWorkoutContainer(index)}
                  className={!isMobile? styles.button : styles.button_mobile}
                >
                  <div className={!isMobile? styles.workoutInfo : styles.workoutInfo_mobile}>
                  <div className={!isMobile? styles.iconAndText : styles.iconAndText_mobile}>
                      <img
                        src={getIconByType(workout.type)}
                        alt="Workout Icon"
                        className={styles.buttonIcon}
                      />
                      <div className={styles.textInfo}>
                        <p >{t(`${workout.name}`)}</p>
                        <p className={styles.calories}>
                          <FaFire />
                          {workout.totalCalories} {t("calories")}
                        </p>
                      </div>
                    </div>

                    {!isOpen ? (
                      <img
                        className={styles.arrowIcon}
                        src={arrowDown}
                        alt="Arrow Down"
                      />
                    ) : (
                      <img
                        className={styles.arrowIcon}
                        src={arrowUp}
                        alt="Arrow Up"
                      />
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div className={styles.workoutDetails}>
                    <WorkoutDetails
                      name={workout.name[currentLanguage] || workout.name.en}
                      type={workout.type}
                      exercises={workout.exercises}
                      onCheck={handleExerciseCheck}
                      onFavoriteToggle={onFavoriteToggle}
                      workoutId={workout.id}
                      user={user}
                      t={t}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExerciseList;