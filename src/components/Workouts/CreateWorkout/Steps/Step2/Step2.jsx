import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import ExerciseList from "../../../../../assets/ExercisesDatabase/ExerciseInfo.json";
import styles from "./Step2.module.css";

const Step2 = ({
  selectedGroups,
  workoutName,
  workoutType,
  onPrevious,
  onNext,
}) => {
  const [isCheckedMap, setIsCheckedMap] = useState({});
  const [expandedLists, setExpandedLists] = useState({});
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]); // New state to store selected muscle groups

  // Filtering exercises based on workoutType
  const filteredExercises = ExerciseList.filter(
    (exercise) => exercise.ExerciseType === workoutType
  );

  // Flattening the structure to get all muscle groups and their exercises
  const exercisesByGroup = filteredExercises.reduce((acc, item) => {
    Object.keys(item).forEach((group) => {
      if (group !== "ExerciseType") {
        if (!acc[group]) acc[group] = [];
        acc[group] = [...acc[group], ...item[group]];
      }
    });
    return acc;
  }, {});

  const handleCheckClick = (group, exercise) => {
    const key = `${group}-${exercise.id}`;
    setIsCheckedMap((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleList = (group) => {
    setExpandedLists((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
  };

  const handleNextClick = () => {
    const selectedExercises = Object.keys(isCheckedMap)
      .filter((key) => isCheckedMap[key])
      .map((key) => {
        const [group, id] = key.split("-");
        // Find the selected exercise from the filteredExercises and add the group property
        const exercise = exercisesByGroup[group].find((exercise) => exercise.id === id);
        return { ...exercise, group };
      });
      console.log(selectedExercises)
    onNext(selectedExercises);
  };

  const handlePrevious = () => {
    setSelectedMuscleGroups([]); // Reset selected muscle groups if going back
    onPrevious();
  };

  // Function to update selected muscle groups
  const updateSelectedMuscleGroups = (group) => {
    setSelectedMuscleGroups((prevGroups) => [...prevGroups, group]);
  };

  return (
    <div className={styles.listContainer}>
      <h2>{workoutName}</h2>
      <h3>
        {workoutType === "Strength"
          ? "Select Muscle Groups"
          : workoutType === "Cardio"
          ? "Select Modalities"
          : "Select Positions"}
      </h3>
      <div className={styles.lists}>
        {Object.keys(exercisesByGroup).map(
          (group) =>
            selectedGroups.includes(group) && (
              <div key={group} className={`${styles.outsideContainer} ${expandedLists[group] ? styles.expanded : ''}`}>
                <div
                  className={styles.arrowContainer}
                  onClick={() => toggleList(group)}
                >
                  <p className={styles.arrowContainerSelectExercises}>{group}</p>
                  {expandedLists[group] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedLists[group] && (
                  <ul className={styles.groupUl}>
                    {exercisesByGroup[group].map((exercise) => (
                      <li
                        key={exercise.id}
                        className={`${styles.groupItem} ${expandedLists[group] ? '' : styles.collapsed}`}
                        onClick={() => {
                          handleCheckClick(group, exercise);
                          updateSelectedMuscleGroups(group); // Update selected muscle groups
                        }}
                      >
                        {isCheckedMap[`${group}-${exercise.id}`] ? (
                          <FaCheckSquare className={styles.checkedIcon} />
                        ) : (
                          <FaRegSquare className={styles.uncheckedIcon} />
                        )}
                        <p className={styles.exerciseName}>{exercise.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
        )}
      </div>
      <div className={styles.buttons}>
        <button className="inactiveButton-medium" onClick={handlePrevious}>
          Previous
        </button>
        <button className="inactiveButton-medium" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;