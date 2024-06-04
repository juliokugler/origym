import React, { useState, useEffect } from "react";
import styles from "./HomeExerciseList.module.css";
import { useTranslation } from "react-i18next";
import { FaCheckSquare, FaRegSquare, FaFire } from "react-icons/fa";
import strengthIcon from "../../assets/Icons/strength.png";
import cardioIcon from "../../assets/Icons/cardio.png";
import yogaIcon from "../../assets/Icons/yoga.png";
import martialArtsIcon from "../../assets/Icons/martialArts.png";
import groupIcon from "../../assets/Icons/group.png";
import WorkoutDetails from "../../components/Workouts/WorkoutDetails/WorkoutDetails";
import { updateDoc, doc, getFirestore, setDoc } from "firebase/firestore";

const ExerciseList = ({
  exercises,
  favoriteList,
  user,
  onCheck,
  dailyInfo,
  setDailyInfo,
  onUserInfoChange
}) => {
  const { t } = useTranslation();
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

      // Determine the new TDEE based on the workout's current completion status
      const newTDEE = workout.isWorkoutDone
        ? dailyInfo.TDEE - workoutCalories
        : dailyInfo.TDEE + workoutCalories;

      // Update workout status in the database and update TDEE
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
      // Update the TDEE in dailyInfo
      await setDoc(
        dailyInfoRef,
        { TDEE: newTDEE },
        { merge: true }
      );

      // Toggle the workout's completion status
      const newWorkoutStatus = !workout.isWorkoutDone;

      // Update the workout status in the workouts collection
      await updateDoc(workoutRef, {
        isWorkoutDone: newWorkoutStatus,
      });

      console.log("Workout status and calorie value updated successfully.");
      onUserInfoChange();

      // Update local state to reflect the changes
      setDailyInfo((prev) => ({
        ...prev,
        TDEE: newTDEE,
      }));

      // Update the workout object to reflect the new status
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

  return (
    <div className={styles.container}>
      {!exercises || exercises.length <= 0 ? (
        <div className={styles.noWorkoutsMessage}>
          <p>
            <strong>{t("noWorkoutsScheduled")}</strong>
          </p>
        </div>
      ) : null}

      {exercises &&
        exercises.length > 0 &&
        exercises.map((workout, index) => (
          <div key={index} className={styles.buttonContainer}>
            <button className={styles.button}>
              <div className={styles.workoutInfo}>
                <img
                  src={getIconByType(workout.type)}
                  alt="Workout Icon"
                  className={styles.buttonIcon}
                />
                <div className={styles.textInfo}>
                  <p>{workout.name}</p>
                  <p>
                    {workout.isWorkoutDone ? (
                      <div className={styles.checkedContainer}>
                        <p
                          className={
                            animateWorkout === workout.id ? styles.pulse : ""
                          }
                        >
                          <FaFire />
                          {workout.totalCalories} calories burned
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
                          {workout.totalCalories} calorie burn
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
                  <FaCheckSquare
                    onClick={(e) => handleCheckClick(e, workout)}
                  />
                ) : (
                  <FaRegSquare onClick={(e) => handleCheckClick(e, workout)} />
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