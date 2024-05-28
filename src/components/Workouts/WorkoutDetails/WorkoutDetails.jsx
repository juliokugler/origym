import React, { useState } from "react";
import styles from "./WorkoutDetails.module.css";
import Exercise from "../Exercise/Exercise";
import EditExercise from "../Exercise/EditExercise";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import useUpdateExercise from "../../../hooks/useUpdateExercise"; // Adjust the path as needed

const WorkoutDetails = ({
  exercises,
  favoriteList,
  onClose,
  name,
  type,
  onCheck,
  onFavoriteToggle,
  workoutId,
  user,
}) => {
  const [allCompleted, setAllCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercises, setEditedExercises] = useState([...exercises]);
  const { updateExerciseInFirebase, loading, error } = useUpdateExercise();
  console.log("USERDATA:", user);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleSaveChanges = () => {
    editedExercises.forEach((exercise) => {
      // Check if exercise has valid attributes
      if (
        exercise.id !== undefined &&
        exercise.group !== undefined &&
        exercise.name !== undefined &&
        exercise.reps !== undefined &&
        exercise.sets !== undefined &&
        exercise.weight !== undefined
      ) {
        // Create an object to hold only defined attributes
        const updatedAttributes = {
          reps: exercise.reps,
          sets: exercise.sets,
          weight: exercise.weight,
        };
        console.log("Updated attributes:", updatedAttributes);
        // Pass the updated exercise attributes to the hook
        updateExerciseInFirebase(
          user.uid,
          workoutId,
          exercise.id,
          updatedAttributes
        );
      } else {
        console.log(
          "Skipping exercise update due to undefined attributes:",
          exercise
        );
      }
    });
    setIsEditing(false);
  };
  const handleInputChange = (id, name, value) => {
    setEditedExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [name]: value } : exercise
      )
    );
  };

  const getAttributes = (type) => {
    switch (type) {
      case "Strength":
        return ["Exercises", "Sets", "Reps", "Weight", <FaRegSquare />];
      case "Cardio":
        return ["Modalities", "Distance", "Time", "Pace", <FaRegSquare />];
      case "Yoga":
        return ["Positions", "Duration", "Difficulty", <FaRegSquare />];
      default:
        return null;
    }
  };

  const tableHeaders = getAttributes(type);

  return (
    <div className={styles.container}>
      <table className={styles.exerciseTable}>
        <thead>
          <tr>
            <div className={styles.header}>
              {tableHeaders && (
                <div className={styles.headerName}>
                  <th key={0} style={{ width: "10vw" }}>
                    {tableHeaders[0]}
                  </th>
                </div>
              )}
              <div className={styles.headerAttributes}>
                {tableHeaders &&
                  tableHeaders.slice(1).map((header, index) => (
                    <th key={index + 1} style={{ width: "5vw" }}>
                      {header}
                    </th>
                  ))}
              </div>
            </div>
          </tr>
        </thead>
        <tbody>
          {editedExercises.map((exercise) =>
            isEditing ? (
              <EditExercise
                key={exercise.id}
                exercise={{
                  name: exercise.name,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  weight: exercise.weight,
                  group: exercise.group,
                  id: exercise.id,
                  isFavorite: exercise.isFavorite,
                  duration: exercise.duration,
                  inclination: exercise.inclination,
                  distance: exercise.distance,
                  time: exercise.time,
                  speed: exercise.speed,
                  difficulty: exercise.difficulty,
                  type: type,
                }}
                allCompleted={allCompleted}
                favoriteList={favoriteList}
                onCheck={onCheck}
                onFavoriteToggle={onFavoriteToggle}
                onInputChange={handleInputChange}
              />
            ) : (
              <Exercise
                key={exercise.id}
                exercise={{
                  name: exercise.name,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  weight: exercise.weight,
                  group: exercise.group,
                  id: exercise.id,
                  isFavorite: exercise.isFavorite,
                  duration: exercise.duration,
                  inclination: exercise.inclination,
                  distance: exercise.distance,
                  time: exercise.time,
                  speed: exercise.speed,
                  difficulty: exercise.difficulty,
                  type: type,
                }}
                allCompleted={allCompleted}
                favoriteList={favoriteList}
                onCheck={onCheck}
                onFavoriteToggle={onFavoriteToggle}
              />
            )
          )}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <button className="inactiveButton">Remove Workout</button>
        {isEditing ? (
          <>
            <button onClick={handleEditClick}>Cancel</button>
            <button className="inactiveButton" onClick={handleSaveChanges} disabled={loading}>
              Save Changes
            </button>
          </>
        ) : (
          <button className="inactiveButton" onClick={handleEditClick}>Edit Workout</button>
        )}
        {error && <p className={styles.error}>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default WorkoutDetails;
