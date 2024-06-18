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
  currentLanguage,
  t,
}) => {
  const [isCheckedMap, setIsCheckedMap] = useState({});
  const [expandedLists, setExpandedLists] = useState({});
  const [showWarning, setShowWarning] = useState(false); // State to manage warning display

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
    setShowWarning(false); // Reset warning on selecting an exercise
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

    if (selectedExercises.length === 0) {
      setShowWarning(true); // Show warning if no exercise is selected
    } else {
      onNext(selectedExercises);
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className={styles.listContainer}>
      <h2>{t(`${workoutName}`)}</h2>
      <h3>{t("selectMuscleGroups")}</h3>
      <div className={styles.lists}>
        {selectedGroups.map((group) => (
          <div key={group} className={`${styles.outsideContainer} ${expandedLists[group] ? styles.expanded : ''}`}>
            <div
              className={styles.arrowContainer}
              onClick={() => toggleList(group)}
            >
              <p className={styles.arrowContainerSelectExercises}>{t(`${group}`)}</p>
              {expandedLists[group] ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedLists[group] && (
              <ul className={styles.groupUl}>
                {exercisesByGroup[group].map((exercise) => (
                  <li
                    key={exercise.id}
                    className={`${styles.groupItem} ${expandedLists[group] ? '' : styles.collapsed}`}
                    onClick={() => handleCheckClick(group, exercise)}
                  >
                    {isCheckedMap[`${group}-${exercise.id}`] ? (
                      <FaCheckSquare className={styles.checkedIcon} />
                    ) : (
                      <FaRegSquare className={styles.uncheckedIcon} />
                    )}
                    <p className={styles.exerciseName}>{t(`${exercise.name}`)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className={`${styles.outsideContainer} ${expandedLists["Cardio"] ? styles.expanded : ''}`}>
          <div
            className={styles.arrowContainer}
            onClick={() => toggleList("Cardio")}
          >
            <p className={styles.arrowContainerSelectExercises}>{t("Cardio")}</p>
            {expandedLists["Cardio"] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedLists["Cardio"] && (
            <ul className={styles.groupUl}>
              {exercisesByGroup["Cardio"].map((exercise) => (
                <li
                  key={exercise.id}
                  className={`${styles.groupItem} ${expandedLists["Cardio"] ? '' : styles.collapsed}`}
                  onClick={() => handleCheckClick("Cardio", exercise)}
                >
                  {isCheckedMap[`Cardio-${exercise.id}`] ? (
                    <FaCheckSquare className={styles.checkedIcon} />
                  ) : (
                    <FaRegSquare className={styles.uncheckedIcon} />
                  )}
                  <p className={styles.exerciseName}>{t(`${exercise.name}`)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <button className="button" onClick={handlePrevious}>
          {t("back")}
        </button>
        <button className="button" onClick={handleNextClick}>
          {t("next")}
        </button>
      </div>
      {showWarning && <p className={styles.warning}>{t("warningSelectExercises")}</p>}
    </div>
  );
};

export default Step2;