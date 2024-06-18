import React, { useState, useEffect } from "react";
import Step1 from "./Steps/Step1/Step1";
import Step2 from "./Steps/Step2/Step2";
import Step3 from "./Steps/Step3/Step3";
import Step4 from "./Steps/Step4/Step4";
import styles from "./CreateWorkout.module.css";

const CreateWorkout = ({
  onClose,
  onCorrectSubmit,
  selectedDay,
  onCreate,
  weight,
  currentLanguage, t
}) => {
  const [workoutType, setWorkoutType] = useState("Strength");
  const [workoutName, setWorkoutName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedDays, setSelectedDays] = useState([selectedDay || "Sun"]);
  const [partner, setPartner] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exerciseId, setExerciseId] = useState("");

  useEffect(() => {
    console.log("selectedExercises:", selectedExercises);
  }, [selectedExercises]);

  const handleNext = (name, options, days, type) => {
    setWorkoutType(type);
    setWorkoutName(name);
    setSelectedDays(days);
    setSelectedOptions(options);
    setCurrentPage(2);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleFinish = (selectedExercises) => {
    setSelectedExercises(selectedExercises);
    setCurrentPage(3);
  };

  const handleFormSubmit = () => {
    setCurrentPage(4);
  };

  const handleCreateAnother = () => {
    resetState();
    setCurrentPage(1);
  };

  const handlePartnerChange = (partner) => {
    setPartner(partner);
  };

  const resetState = () => {
    setWorkoutType("Strength");
    setWorkoutName("");
    setSelectedOptions([]);
    setSelectedExercises([]);
    setSelectedDays([selectedDay || "Sun"]);
    setPartner("");
    setExerciseId("");
  };

  const renderStep = () => {
    switch (currentPage) {
      case 1:
        return (
          <Step1
            onNext={handleNext}
            onPartnerChange={handlePartnerChange}
            selectedDay={selectedDay}
            t={t}
          />
        );
      case 2:
        return (
          <Step2
            selectedGroups={selectedOptions}
            workoutName={workoutName}
            onPrevious={handlePrevious}
            onNext={handleFinish}
            workoutType={workoutType}
            currentLanguage={currentLanguage}
            t={t}
          />
        );
      case 3:
        return (
          <Step3
            selectedType={workoutType}
            selectedExercises={selectedExercises}
            selectedDays={selectedDays}
            workoutName={workoutName}
            onSubmit={handleFormSubmit}
            onCreate={onCreate}
            onCorrectSubmit={onCorrectSubmit}
            selectedOptions={selectedOptions}
            exerciseId={exerciseId}
            userWeight={weight}
            currentLanguage={currentLanguage}
            t={t}
          />
        );
      case 4:
        return <Step4 onCreate={handleCreateAnother}   t={t} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.section}>{renderStep()}</div>
      </div>
    </div>
  );
};

export default CreateWorkout;