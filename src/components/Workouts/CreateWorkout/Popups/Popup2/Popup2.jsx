import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import StrengthList from "../../../../../assets/ExercisesDatabase/Strength.json";
import CardioList from "../../../../../assets/ExercisesDatabase/Cardio.json";
import YogaList from "../../../../../assets/ExercisesDatabase/Yoga.json";
import styles from "./Popup2.module.css";

const Popup2 = ({
  selectedGroups,
  workoutName,
  workoutType,
  onPrevious,
  onNext,
}) => {
  const [isCheckedMap, setIsCheckedMap] = useState({});
  const [expandedLists, setExpandedLists] = useState({});

  let selection;
  let list;
  switch (workoutType) {
    case "Strength":
      selection = "Select Muscle Groups";
      list = StrengthList; // Corrected assignment
      break;
    case "Cardio":
      selection = "Select Modalities";
      list = CardioList;
      break;
    case "Yoga":
      selection = "Select Positions";
      list = YogaList;
      break;
    default:
      selection = "Select";
      list = [];
  }

  const handleCheckClick = (selectedGroup, exerciseName) => {
    setIsCheckedMap((prevState) => {
      const key = `${selectedGroup}-${exerciseName}`;
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  const toggleList = (selectedGroup) => {
    setExpandedLists((prevState) => ({
      ...prevState,
      [selectedGroup]: !prevState[selectedGroup],
    }));
  };

  const handleNext = () => {
    const selectedExercises = [];
    for (const selectedGroup of selectedGroups) {
      list[selectedGroup].forEach((exercise) => {
        const key = `${selectedGroup}-${exercise.name}`;
        if (isCheckedMap[key]) {
          selectedExercises.push({
            group: selectedGroup,
            exercise: exercise.name,
            id: exercise.id,
            MET: exercise.MET,
          });
        }
      });
    }
    onNext(selectedExercises);
  };

  return (
    <div className={styles.listContainer}>
      <h2>{workoutName}</h2>
      <h3>{selection}</h3>
      <div className={styles.lists}>
        {selectedGroups.map((selectedGroup, index) => (
          <div
            className={`${styles.exerciseList} ${
              expandedLists[selectedGroup] ? styles.open : ""
            }`}
            key={index}
          >
            <p
              className={styles.listName}
              onClick={() => toggleList(selectedGroup)}
            >
              {selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)}
            </p>
            <div
              className={`${styles.outsideContainer} ${
                expandedLists[selectedGroup] ? styles.expanded : ""
              }`}
            >
              <ul className={styles.groupUl}>
                <li
                  className={`${styles.groupItem} ${
                    !expandedLists[selectedGroup] ? styles.collapsed : ""
                  }`}
                  onClick={() => toggleList(selectedGroup)}
                >
                  {!expandedLists[selectedGroup] ? (
                    <div className={styles.selectExercises}>
                      Select Exercises
                    </div>
                  ) : (
                    ""
                  )}
                  {!expandedLists[selectedGroup] ? (
                    <FaChevronDown className={styles.arrowIcon} />
                  ) : (
                    <div className={styles.arrowContainer}>
                      <div className={styles.selectExercises}>
                        Select Exercises
                      </div>
                      <FaChevronUp className={styles.arrowIcon} />
                    </div>
                  )}
                </li>

                {expandedLists[selectedGroup] &&
                  list[selectedGroup].map((exercise, exerciseIndex) => (
                    <li
                      onClick={() =>
                        handleCheckClick(selectedGroup, exercise.name)
                      }
                      className={styles.exerciseDisplay}
                      key={exerciseIndex}
                    >
                      <div className={styles.exerciseName}>{exercise.name}</div>
                      {isCheckedMap[`${selectedGroup}-${exercise.name}`] ? (
                        <FaCheckSquare className={styles.checkedIcon} />
                      ) : (
                        <FaRegSquare className={styles.uncheckedIcon} />
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className="inactiveButton-medium" onClick={onPrevious}>Previous</button>
        <button className="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};
export default Popup2;
