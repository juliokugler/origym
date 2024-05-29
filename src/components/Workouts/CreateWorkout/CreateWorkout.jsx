import React, { useState, useEffect } from "react";
import Popup1 from "./Popups/Popup1/Popup1";
import Popup2 from "./Popups/Popup2/Popup2";
import Popup3 from "./Popups/Popup3/Popup3";
import Popup4 from "./Popups/Popup4/Popup4";
import styles from "./CreateWorkout.module.css";

const CreateWorkout = ({
  onClose,
  onCorrectSubmit,
  selectedDay,
  onCreate,
  weight,
}) => {
  const [workoutType, setWorkoutType] = useState("Strength");
  const [workoutName, setWorkoutName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [partner, setPartner] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exerciseId, setExerciseId] = useState("");

  const handleNext = (name, selectedOptions, days, selectedType) => {
    setWorkoutType(selectedType);
    setWorkoutName(name);
    setSelectedDays(days);
    setSelectedOptions(selectedOptions);
    setCurrentPage(2);
    console.log("Selected Options:", selectedOptions); // Log the updated options immediately
  };

  const handlePrevious = () => {
    resetState();
    setCurrentPage(1);
  };

  const handleFinish = (workouts) => {
    setSelectedExercises(workouts);
    setCurrentPage(3);
    console.log(workouts);
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
    setWorkoutType("");
    setWorkoutName("");
    setSelectedOptions([]);
    setSelectedExercises([]);
    setSelectedDays([]);
    setPartner("");
    setExerciseId("");
  };
  console.log("Selected Type in CreateWorkout:", workoutType);

  return (
    <div>
      {currentPage !== 0 && (
        <div className={styles.background}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={onClose}>
              Close
            </button>
            <div className={styles.section}>
              {currentPage === 1 && (
                <Popup1
                  onNext={handleNext}
                  onPartnerChange={handlePartnerChange}
                  selectedDay={selectedDay}
                />
              )}
              {currentPage === 2 && (
                <Popup2
                  selectedGroups={selectedOptions}
                  workoutName={workoutName}
                  onPrevious={handlePrevious}
                  onNext={handleFinish}
                  workoutType={workoutType}
                />
              )}

              {currentPage === 3 && (
                <Popup3
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
                />
              )}
              {currentPage === 4 && <Popup4 onCreate={handleCreateAnother} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWorkout;
