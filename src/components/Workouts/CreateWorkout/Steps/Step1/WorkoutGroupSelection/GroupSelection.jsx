import React, { useState } from "react";
import styles from "./GroupSelection.module.css";

const GroupSelection = ({ selectedType, onChange, t }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions); // Pass the updated options directly
  };

  const getTitleByType = (selectedType) => {
    switch (selectedType) {
      case "Strength":
        return t("selectMuscleGroups");
      case "Cardio":
        return "Select Cardio Modalities";
           default:
        return "";
    }
  };

  // Define muscle group names for each type
  const groups = {
    Strength: [
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
    ],
    Cardio: ["running", "hiit", "walking", "swimming"],
    
  };

  return (
    <div className={styles.groupSection}>
      <p className={styles.title}>{getTitleByType(selectedType)}</p>
      <div className={styles.groupRow}>
        {groups[selectedType].map((optionKey, index) => {
          const translatedLabel = t(optionKey); // Fetch translation dynamically
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(optionKey)}
              className={
                selectedOptions.includes(optionKey)
                  ? "activeGroupButton" // Adjust the classes as per your styles
                  : "notSelectedGroupButton" // Adjust the classes as per your styles
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