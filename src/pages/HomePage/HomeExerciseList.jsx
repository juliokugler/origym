import React, { useState, useEffect } from "react";
import styles from "./HomeExerciseList.module.css";
import Exercise from "../../components/Workouts/Exercise/Exercise";
import { useTranslation } from "react-i18next";
import { FaCheckSquare, FaRegSquare, FaFire } from "react-icons/fa";
import strengthIcon from "../../assets/Icons/strength.png";
import cardioIcon from "../../assets/Icons/cardio.png";
import yogaIcon from "../../assets/Icons/yoga.png";
import martialArtsIcon from "../../assets/Icons/martialArts.png";
import groupIcon from "../../assets/Icons/group.png";
import WorkoutDetails from "../../components/Workouts/WorkoutDetails/WorkoutDetails";
import { updateDoc, doc, getFirestore } from "firebase/firestore"; // Import Firestore functions for updating documents
import { useAuthValue } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";

const ExerciseList = ({
  exercises,
  favoriteList,
  firestore,
  user,
  onCheck,
}) => {
  // Include firestore and user as props
  const [allCompleted, setAllCompleted] = useState(false);
  const { t } = useTranslation();
  const [showWorkout, setShowWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [animateWorkout, setAnimateWorkout] = useState(null);

  const handleCheckClick = async (e, workout) => {
    e.stopPropagation(); // Prevent event bubbling

    const handleAnimation = () => {
      setAnimateWorkout(workout.id);
      setTimeout(() => setAnimateWorkout(null), 500); // Remove animation class after 0.5s
    };

    try {
      if (!workout || !workout.id) {
        console.error("Invalid workout object:", workout);
        return; // Exit early if the workout object is invalid
      }

      // Update workout details in the database
      await updateWorkoutDetails(workout);
      onCheck();
      setIsChecked((prev) => !prev);
      handleAnimation(); // Trigger animation
      // Optionally, update state or perform any other action upon successful update
    } catch (error) {
      console.error("Error updating workout details:", error);
    }
  };

  const handleShowWorkout = (workout) => {
    setSelectedWorkout(workout); // Set selected workout
    setShowWorkout(true); // Open the workout details
  };

  const handleCloseWorkout = (workout) => {
    setShowWorkout(false); // Open the workout details
  };

  useEffect(() => {
    // Update showHeader state when showWorkout state changes
    setShowHeader(showWorkout);
  }, [showWorkout]);

  const [showHeader, setShowHeader] = useState(false); // Track if the header should be shown

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

  const updateWorkoutDetails = async (workout) => {
    try {
      const firestore = getFirestore();
      await updateDoc(
        doc(firestore, "users", user.uid, "workouts", workout.id),
        {
          isWorkoutDone: !workout.isWorkoutDone, // Toggle the isWorkoutDone value
        }
      );
    } catch (error) {
      throw error; // Throw the error to handle it in the calling function
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
            <button
              // Pass the workout to open
              className={styles.button}
            >
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
                          {" "}
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
              exercises={selectedWorkout.exercises} // Pass exercises of selected workout
              favoriteList={favoriteList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
