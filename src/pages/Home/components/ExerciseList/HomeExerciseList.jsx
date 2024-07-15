//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./HomeExerciseList.module.css";

//Firebase
import { updateDoc, doc, getFirestore, setDoc } from "firebase/firestore";

//Icons
import { FaCheckSquare, FaRegSquare, FaFire } from "react-icons/fa";
import strengthIcon from "../../../../assets/Icons/strength.png";
import cardioIcon from "../../../../assets/Icons/cardio.png";

//Page Components
import WorkoutDetails from "../../../Workouts/components/WorkoutDetails/WorkoutDetails"

const ExerciseList = ({
  isMobile,
  exercises,
  favoriteList,
  user,
  onCheck,
  dailyInfo,
  setDailyInfo,
  onUserInfoChange,
  t
}) => {
  const [showWorkout, setShowWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [animateWorkout, setAnimateWorkout] = useState(null);

  const handleCheckClick = async (e, workout) => {
    e.stopPropagation();

    try {
      if (!workout || !workout.id) {
        console.error("Invalid workout object:", workout);
        return;
      }

      const workoutCalories = workout.totalCalories;

      const newTDEE = workout.isWorkoutDone
        ? dailyInfo.TDEE - workoutCalories
        : dailyInfo.TDEE + workoutCalories;

      await updateWorkoutStatus(workout, newTDEE);
      onCheck();
      setAnimateWorkout(workout.id);
      setTimeout(() => setAnimateWorkout(null), 500);
    } catch (error) {
      console.error("Error updating workout details:", error);
    }
  };

  const updateWorkoutStatus = async (workout, newTDEE) => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);
    const workoutRef = doc(db, `users/${user.uid}/workouts/${workout.id}`);

    try {
      await setDoc(
        dailyInfoRef,
        { TDEE: newTDEE },
        { merge: true }
      );

      const newWorkoutStatus = !workout.isWorkoutDone;

      await updateDoc(workoutRef, {
        isWorkoutDone: newWorkoutStatus,
      });

      console.log("Workout status and calorie value updated successfully.");
      onUserInfoChange();

      setDailyInfo((prev) => ({
        ...prev,
        TDEE: newTDEE,
      }));

      workout.isWorkoutDone = newWorkoutStatus;
    } catch (error) {
      console.error("Error updating workout status and calorie values:", error);
    }
  };

  const handleShowWorkout = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkout(true);
  };

  const handleCloseWorkout = () => {
    setShowWorkout(false);
  };

  useEffect(() => {
    setShowHeader(showWorkout);
  }, [showWorkout]);

  const [showHeader, setShowHeader] = useState(false);

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

  return (
    <div className={styles.container}>
      {!exercises || exercises.length <= 0 ? (
        <div className={styles.noWorkoutsMessage}>
          <p>
            {t("noWorkoutsScheduled")}
          </p>
        </div>
      ) : null}

      {exercises &&
        exercises.length > 0 &&
        exercises.map((workout, index) => (
          <div key={index} className={styles.buttonContainer}>
            <button className={isMobile? styles.button_mobile : styles.button}>
              <div className={styles.workoutInfo}>
                <img
                  src={getIconByType(workout.type)}
                  alt="Workout Icon"
                  className={styles.buttonIcon}
                />
                <div className={styles.textInfo}>
                  <p>{t(`${workout.name}`)}</p>
                  <p>
                    {workout.isWorkoutDone ? (
                      <div className={styles.checkedContainer}>
                        <p
                          className={
                            animateWorkout === workout.id ? styles.pulse : ""
                          }
                        >
                          <FaFire />
                          {workout.totalCalories} {t("calories")}
                        </p>
                      </div>
                    ) : (
                      <div className={styles.uncheckedContainer}>
                        <p
                          className={
                            animateWorkout === workout.id ? styles.pulse : ""
                          }
                        >
                          <FaFire />
                          {workout.totalCalories} {t("calories")}
                        </p>
                      </div>
                    )}
                  </p>
                </div>
              </div>

              <div className={styles.details}>
                <p onClick={() => handleShowWorkout(workout)}>
                  <u>Details</u>
                </p>
                {workout.isWorkoutDone ? (
                  <div className={styles.checkedSquare}>
                  <FaCheckSquare
                    onClick={(e) => handleCheckClick(e, workout)}
                  /></div>
                ) : ( <div className={styles.uncheckedSquare}>
                  <FaRegSquare onClick={(e) => handleCheckClick(e, workout)} /></div>
                )}
              </div>
            </button>
          </div>
        ))}

      {showWorkout && selectedWorkout && (
        <div className={styles.background}>
          <div className={styles.popupContainer}>
            <WorkoutDetails
              onClose={handleCloseWorkout}
              name={selectedWorkout.name}
              type={selectedWorkout.type}
              exercises={selectedWorkout.exercises}
              favoriteList={favoriteList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;