import React, { useState, useEffect } from "react";
import styles from "./Exercise.module.css";
import { FaCheckSquare, FaRegSquare, FaStar } from "react-icons/fa";
import useToggleFavorite from "../../../hooks/useToggleFavorite";

const Exercise = ({ exercise, allCompleted }) => {
  const { name, type } = exercise;
  const [isChecked, setIsChecked] = useState(false);
  const { toggleFavorite, starColor, isFavorite } = useToggleFavorite(exercise);
  const [, forceUpdate] = useState(); // Dummy state to force re-render

  useEffect(() => {
    setIsChecked(allCompleted);
    console.log(`All completed status: ${allCompleted}`);
  }, [allCompleted]);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    console.log(`Checked status for ${name}: ${!isChecked}`);
  };

  const getAttributes = (type) => {
    switch (type) {
      case "Strength":
        return ["sets", "reps", "weight"];
      case "Cardio":
        return ["distance", "time", "pace"];
      case "Yoga":
        return ["duration", "difficulty"];
      default:
        return [];
    }
  };

  const attributes = getAttributes(type);

  useEffect(() => {
    // Force update to re-render component when favorite status changes
    forceUpdate({});
  }, [isFavorite]);

  return (
    <div className={styles.exerciseCard} id={`exercise-${exercise.id}`}>
      <table className={styles.exerciseTable}>
        <tbody>
          <tr className={styles.exerciseTableRow}>
            <td className={styles.exerciseName} style={{ width: "10vw", textAlign: "left" }}>
              <div className={styles.nameAndIcon}>
                <FaStar
                  className={`${styles.starIcon} ${isFavorite ? styles.favorite : ""}`}
                  color={starColor}
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(`Toggling favorite for ${name}`);
                    toggleFavorite();
                  }}
                />
                {name}
              </div>
            </td>
            {attributes.map((attribute, index) => (
              <td key={index} style={{ textAlign: "center", width: "5vw" }}>
                {exercise[attribute]}
                {attribute === "weight" && "kg"}
                {attribute === "distance" && "km"}
                {attribute === "duration" && "min"}
                {attribute === "pace" && "min/km"}
              </td>
            ))}
            <td style={{ textAlign: "center", width: "5vw" }}>
              {isChecked ? (
                <FaCheckSquare
                  className={styles.checkIcon}
                  onClick={toggleCheck}
                  size={20}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaRegSquare
                  className={styles.checkIcon}
                  onClick={toggleCheck}
                  size={20}
                  style={{ cursor: "pointer" }}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Exercise;