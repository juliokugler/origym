import React, { useState } from "react";
import styles from "./GroupSelection.module.css";

const GroupSelection = ({ selectedType, onChange, t }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const getTitleByType = (selectedType) => {
    switch (selectedType) {
      case "Cardio":
        return t("selectCardioModalities");
               default:
        return t("selectMuscleGroups");
    }
  };

  
  const strengthGroups = [
    "chest",
    "biceps",
    "forearms",
    "triceps",
    "shoulders",
    "abs",
    "obliques",
    "hamstrings",
    "quadriceps",
    "calves",
    "traps",
    "glutes",
  ];

  const cardioGroups = ["indoors", "outdoors", "homeWorkouts"];

 
  const groups = {
    Strength: strengthGroups,
    Hypertrophy: strengthGroups,
    Endurance: cardioGroups,
    Cardio: cardioGroups,
  };

  return (
    <div className={styles.groupSection}>
      <p className={styles.title}>{getTitleByType(selectedType)}</p>
      <div className={styles.groupRow}>
        {groups[selectedType].map((optionKey, index) => {
          const translatedLabel = t(optionKey);
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(optionKey)}
              className={
                selectedOptions.includes(optionKey)
                  ? "activeGroupButton"
                  : "notSelectedGroupButton"
              }
            >
              {translatedLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSelection;