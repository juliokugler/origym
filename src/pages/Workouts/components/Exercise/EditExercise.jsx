import React, { useState, useEffect } from "react";
import styles from "./Exercise.module.css";
import { FaCheckSquare, FaRegSquare, FaStar } from "react-icons/fa";
import useToggleFavorite from "../../../hooks/useToggleFavorite";

const EditExercise = ({
  exercise,
  allCompleted,
  onFavoriteToggle,
  onInputChange,
}) => {
  const { name, type, sets, reps, weight, distance, time, pace, duration } =
    exercise;
  const [isChecked, setIsChecked] = useState(false);
  const { toggleFavorite, starColor } = useToggleFavorite(exercise);

  useEffect(() => {
    setIsChecked(allCompleted);
    console.log(`All completed status: ${allCompleted}`);
  }, [allCompleted]);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(exercise.id, name, value);
  };

  const getAttributes = (type) => {
    switch (type) {
      case "Strength":
        return ["sets", "reps", "weight"];
      case "Cardio":
        return ["distance", "time", "pace"];
      case "Yoga":
        return ["duration"];
      default:
        return [];
    }
  };

  const attributes = getAttributes(type);

  return (
    <div className={styles.exerciseCard}>
      <table className={styles.exerciseTable}>
        <tbody>
          <tr className={styles.exerciseTableRow}>
            <td
              className={styles.exerciseName}
              style={{ width: "10vw", textAlign: "left" }}
            >
              <div className={styles.nameAndIcon}>
                <div className={styles.starContainer}>
                  <FaStar
                    color={starColor}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log(`Toggling favorite for ${name}`);
                      toggleFavorite();
                      onFavoriteToggle();
                    }}
                  />
                </div>
                {name}
              </div>
            </td>
            {attributes.map((attribute, index) => (
              <td key={index} style={{ textAlign: "center", width: "5vw" }}>
                <input
                  className={styles.input}
                  type="number"
                  name={attribute}
                  value={exercise[attribute]}
                  onChange={handleInputChange}
                />
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

export default EditExercise;
