import React, { useState, useEffect } from "react";
import styles from "./Step1.module.css";
import GroupSelection from "./WorkoutGroupSelection/GroupSelection";
import DaySelector from "../../../../DaySelector/DaySelector";

const Step1 = ({ onNext, selectedDay, t }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDays, setSelectedDays] = useState([selectedDay || "Sun"]);
  const [selectedType, setSelectedType] = useState("Strength");
  const [workoutName, setWorkoutName] = useState("");

  useEffect(() => {
    switch (selectedType) {
      case "Strength":
        setWorkoutName("strengthWorkout");
        break;
      case "Endurance":
        setWorkoutName("enduranceWorkout");
        break;
      case "Hypertrophy":
        setWorkoutName("hypertrophyWorkout");
        break;
      case "Cardio":
        setWorkoutName("cardioSession");
        break;
      default:
        setWorkoutName("");
    }
  }, [selectedType]);

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const index = prevSelectedDays.indexOf(day);
      if (index === -1) {
        return [...prevSelectedDays, day];
      } else {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }
    });
  };

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleNextClick = () => {
    if (selectedOptions.length > 0) {
      onNext(workoutName, selectedOptions, selectedDays, selectedType);
    } else {
      alert("Please select at least one muscle group.");
    }
  };

  const handleDaySelect = (day) => {
    toggleDaySelection(day);
  };

  return (
    <div className={styles.container}>
      <h2>{t("newWorkout")}</h2>
      <div className={styles.row}>
        <label>
          <p>{t("workoutType")}:</p>
          <div className={styles.buttonGroup}>
            <button
              className={selectedType === "Strength" ? "button" : "notSelectedButton-medium"}
              onClick={() => setSelectedType("Strength")}
            >
              {t("strength")}
            </button>
            <button
              className={selectedType === "Endurance" ? "button" : "notSelectedButton-medium"}
              onClick={() => setSelectedType("Endurance")}
            >
              {t("endurance")}
            </button>
            <button
              className={selectedType === "Hypertrophy" ? "button" : "notSelectedButton-medium"}
              onClick={() => setSelectedType("Hypertrophy")}
            >
              {t("hypertrophy")}
            </button>
            <button
              className={selectedType === "Cardio" ? "button" : "notSelectedButton-medium"}
              onClick={() => setSelectedType("Cardio")}
            >
              {t("cardio")}
            </button>
          </div>
        </label>
      </div>

      <GroupSelection
        selectedType={selectedType}
        onChange={handleSelectedOptionsChange}
        t={t}
      />

      <div className={styles.label}>
        <p>{t("assignDaysOfTheWeek")}</p>
        <DaySelector
          selectedDays={selectedDays}
          handleDaySelect={handleDaySelect}
        />
      </div>

      <div className={styles.buttonContainer}>
        {selectedOptions.length > 0 ? (
          <button className="button" onClick={handleNextClick}>
            {t("next")}
          </button>
        ) : (
          <button className="inactiveButton-medium" onClick={handleNextClick}>
            {t("next")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1;