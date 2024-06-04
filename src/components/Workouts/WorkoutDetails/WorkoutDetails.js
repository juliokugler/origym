import React, { useState, useEffect } from "react";
import styles from "./WorkoutDetails.module.css";
import Exercise from "../Exercise/Exercise";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const WorkoutDetails = ({
  exercises,
  favoriteList,
  onClose,
  name,
  type,
  onCheck,
}) => {
  const [allCompleted, setAllCompleted] = useState(false);

  console.log("Received type:", type);

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
              {/* Second div for other headers */}
              <div className={styles.headerAttributes}>
                {tableHeaders &&
                  tableHeaders.slice(1).map((header, index) => (
                    <th key={index + 1} style={{ width: "5vw" }}>
                      {header}
                    </th>
                  ))}{" "}
              </div>
            </div>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutDetails;