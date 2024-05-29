import React, { useState } from "react";
import styles from "./GroupSelection.module.css"
const GroupSelection = ({ selectedType, onChange }) => {
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
        return "Select Muscle Groups";
      case "Cardio":
        return "Select Cardio Modalities";
      case "Crossfit":
        return "Select Crossfit Modalities";
      case "Yoga":
        return "Select Yoga Styles";
      case "Pilates":
        return "Select Pilates Modalities";
      case "Martial Arts":
        return "Select Martial Arts Types";
      case "Group Fitness Classes":
        return "Select Class Modalities";
      default:
        return "";
    }
  };

  return (
    <div className={styles.groupSection}>
      <p className={styles.title}>{getTitleByType(selectedType)}</p>
      {selectedType === "Strength" && (
        <div className={styles.groupRow}>
          {[
            "Chest",
            "Biceps",
            "Forearms",
            "Triceps",
            "Shoulders",
            "Core",
            "Obliques",
            "Hamstrings",
            "Quadriceps",
            "Calves",
            "Traps",
            "Glutes",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Cardio" && (
      <div className={styles.groupRow}>
          {["Running", "HIIT", "Walking", "Swimming"].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Crossfit" && (
       <div className={styles.groupRow}>
          {[
            "Push Press",
            "Deadlift",
            "Pull-up",
            "Muscle-up",
            "Burpee",
            "Thruster",
            "Clean",
            "Snatch",
            "Handstand Push-up",
            "Toes-to-bar",
            "Double-under",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Yoga" && (
        <div className={styles.groupRow}>
          {[
            "Hatha",
            "Vinyasa",
            "Ashtanga",
            "Bikram",
            "Iyengar",
            "Kundalini",
            "Yin",
            "Restorative",
            "Nidra",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Pilates" && (
        <div className={styles.groupRow}>
          {[
            "Classical",
            "Contemporary",
            "Mat",
            "Reformer",
            "Clinical",
            "Barre",
            "Pre and Postnatal",
            "For Athletes",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Martial Arts" && (
       <div className={styles.groupRow}>
          {[
            "Judo",
            "Karate",
            "Brazilian Jiu-Jitsu",
            "Taekwondo",
            "Muay Thai",
            "Boxing",
            "Kickboxing",
            "Wrestling",
            "Capoeira",
            "Krav Maga",
            "Aikido",
            "Kung Fu",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {selectedType === "Group Fitness Classes" && (
        <div className={styles.groupRow}>
          {[
            "Zumba",
            "Spinning",
            "Body Pump",
            "Boot Camp",
            "Kickboxing",
            "Barre",
            "Piloxing",
            "Aerobics",
            "Tabata",
            "TRX",
            "Boxercise",
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.includes(option)
                  ? "activeGroupButton"
                  : "inactiveGroupButton"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSelection;
