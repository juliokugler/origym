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
  onFavoriteToggle,
  currentLanguage,
  t,
}) => {
  const [allCompleted, setAllCompleted] = useState(false);

  const getAttributes = (type) => {
    switch (type) {
      case "Cardio":
        return ["Modalities", "Duration", "Distance", "Speed", <FaRegSquare />];
      default:
        return ["Exercises", "Sets", "Reps", "Weight", <FaRegSquare />];
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
                distance: exercise.distance,
                speed: exercise.speed,
                difficulty: exercise.difficulty,
                type: type,
              }}
              allCompleted={allCompleted}
              favoriteList={favoriteList}
              onCheck={onCheck}
              t={t}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutDetails;
