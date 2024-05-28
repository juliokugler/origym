import React, { useState, useEffect } from "react";
import styles from "./ExerciseList.module.css";
import { useTranslation } from "react-i18next";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import strengthIcon from "../../../assets/Icons/strength.png";
import cardioIcon from "../../../assets/Icons/cardio.png";
import yogaIcon from "../../../assets/Icons/yoga.png";
import martialArtsIcon from "../../../assets/Icons/martialArts.png";
import groupIcon from "../../../assets/Icons/group.png";
import arrowDown from "../../../assets/Icons/CircleArrowDown.png";
import arrowUp from "../../../assets/Icons/CircleArrowUp.png";
import { FaFire } from "react-icons/fa";

const ExerciseList = ({
  exercises,
  number,
  onChange,
  onFavoriteToggle,
  user,
}) => {
  const [openWorkoutIndex, setOpenWorkoutIndex] = useState(null);
  const [doneExercises, setDoneExercises] = useState(0);
  const { t } = useTranslation();
  const { newNumber, setNewNumber } = useState(null);
  console.log("exercises", exercises);
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
      case "Yoga":
        return yogaIcon;
      case "Martial Arts":
        return martialArtsIcon;
      case "Group Fitness Classes":
        return groupIcon;
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
    <div className={styles.container}>
      {!exercises || exercises.length === 0 ? (
        <div className={styles.noWorkoutsMessage}>
          <p>
            <strong>{t("noWorkoutsScheduled")}</strong>
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
                  isOpen ? styles.exerciseCardOpened : styles.exerciseCardClosed
                }
              >
                <div
                  onClick={() => toggleWorkoutContainer(index)}
                  className={styles.button}
                >
                  <div className={styles.workoutInfo}>
                    <div className={styles.iconAndText}>
                      <img
                        src={getIconByType(workout.type)}
                        alt="Workout Icon"
                        className={styles.buttonIcon}
                      />
                      <div className={styles.textInfo}>
                        <p>{workout.name}</p>
                        <p>
                          <FaFire />
                          {workout.totalCalories} calorie burn
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
                    {/* Render workout details here */}
                    <WorkoutDetails
                      name={workout.name}
                      type={workout.type}
                      exercises={workout.exercises}
                      onCheck={handleExerciseCheck}
                      onFavoriteToggle={onFavoriteToggle}
                      workoutId={workout.id}
                      user={user}
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
