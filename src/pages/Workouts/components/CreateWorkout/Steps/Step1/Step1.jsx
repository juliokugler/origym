import React, { useState, useEffect } from "react";
import styles from "./Step1.module.css";
import GroupSelection from "./WorkoutGroupSelection/GroupSelection";
import DaySelector from "../../../../../../components/DaySelector/DaySelector";

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
      alert(t("pleaseSelectOneMuscle"));
    }
  };

  const handleDaySelect = (day) => {
    toggleDaySelection(day);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <h2>{t("newWorkout")}</h2>
      <div className={styles.row}>
        <label className={styles.label}>
          <p className={styles.title}>{t("workoutType")}</p>
          <div className={styles.buttonGroup}>
            <button
              className={selectedType === "Strength" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setSelectedType("Strength")}
            >
              {t("strength")}
            </button>
            <button
              className={selectedType === "Endurance" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setSelectedType("Endurance")}
            >
              {t("endurance")}
            </button>
            <button
              className={selectedType === "Hypertrophy" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setSelectedType("Hypertrophy")}
            >
              {t("hypertrophy")}
            </button>
            <button
              className={selectedType === "Cardio" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setSelectedType("Cardio")}
            >
              {t("cardio")}
            </button>
          </div>
        </label>
      </div>
      <label className={styles.label}>
      <GroupSelection
        selectedType={selectedType}
        onChange={handleSelectedOptionsChange}
        t={t}
      />
</label>
      <div className={styles.label}>
      <p className={styles.title2}>{t("assignDaysOfTheWeek")}</p>
        <DaySelector
          selectedDays={selectedDays}
          handleDaySelect={handleDaySelect}
        />
      </div>
      </div>
      <div className={styles.buttonContainer}>
        {selectedOptions.length > 0 ? (
          <button className="button" onClick={handleNextClick}>
           <p> {t("next")}</p>
          </button>
        ) : (
          <button className="inactiveButton-medium" onClick={handleNextClick}>
            <p>{t("next")}</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1;