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
  const [showWarning, setShowWarning] = useState(false);

  // Filter exercises based on selected groups
  const exercisesByGroup = selectedGroups.reduce((acc, group) => {
    const groupExercises = ExerciseList[group] || [];
    return { ...acc, [group]: groupExercises };
  }, {});

  const handleCheckClick = (group, exercise) => {
    const key = `${group}-${exercise.id}`;
    setIsCheckedMap((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setShowWarning(false);
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
        const exercise = exercisesByGroup[group].find((exercise) => exercise.id === id);
        return { ...exercise, group };
      });

    if (selectedExercises.length === 0) {
      setShowWarning(true);
    } else {
      onNext(selectedExercises);
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.content}>
      <h2>{t(workoutName)}</h2>
      <h3>{t("selectExercises")}</h3>
      <div className={styles.lists}>
        {selectedGroups.map((group) => (
          <div key={group} className={`${styles.outsideContainer} ${expandedLists[group] ? styles.expanded : ''}`}>
            <div className={styles.arrowContainer} onClick={() => toggleList(group)}>
              <p className={styles.arrowContainerSelectExercises}>{t(group)}</p>
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
                    <p className={styles.exerciseName}>{t(exercise.name)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      </div>
      <div className={styles.buttons}>
        <button className="notSelectedButton-medium" onClick={handlePrevious}>
          {t("goBack")}
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