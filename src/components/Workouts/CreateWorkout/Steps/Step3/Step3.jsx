import React, { useState, useEffect } from "react";
import styles from "./Step3.module.css";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { useAuthValue } from "../../../../../contexts/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";

const Step3 = ({
  selectedExercises,
  selectedType,
  workoutName,
  selectedDays,
  onSubmit,
  onCreate,
  userWeight,
}) => {
  const { user } = useAuthValue();
  const [exerciseAttributes, setExerciseAttributes] = useState({});
  const [formError, setFormError] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [muscleGroups, setMuscleGroups] = useState([]);
console.log("sel:", selectedExercises)
  useEffect(() => {
    setDefaultValues();
  }, [selectedExercises]);

  useEffect(() => {
    calculateTotalCalories();
    // Calculate muscleGroups based on selectedExercises
    const groups = [
      ...new Set(selectedExercises.map((exercise) => exercise.group)),
    ];
    setMuscleGroups(groups);
  }, [selectedExercises]);

  const setDefaultValues = () => {
    const defaultExerciseAttributes = {};
    selectedExercises.forEach(({ group, name, id, MET }) => {
      defaultExerciseAttributes[id] = {
        exerciseName: name,
        group: group,
        id: id,
        MET: MET,
        sets: 3,
        reps: 10,
        weight: 0,
        isFavorite: false,
        isDone: false,
      };
    });
    setExerciseAttributes(defaultExerciseAttributes);
  };

  console.log(exerciseAttributes)

  const handleInputChange = (id, field, value) => {
    const parsedValue = value !== "" ? parseInt(value, 10) : 0;

    setExerciseAttributes((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: parsedValue,
      },
    }));
  };

  const calculateTotalCalories = () => {
    let total = 0;
    for (const key in exerciseAttributes) {
      const { MET, sets, reps } = exerciseAttributes[key];
      const effectiveSets = sets > 0 ? sets : 3;
      const effectiveReps = reps > 0 ? reps : 10;
      const duration = effectiveSets * effectiveReps * 0.1;
      const calories = Math.ceil((MET * 3.5 * userWeight * duration) / 200);
      total += calories;
    }
    setTotalCalories(total);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const workoutInfoCollectionRef = collection(userDocRef, "workouts");

      // Construct the workout object with the data
      const exercises = exerciseAttributes;
      const totalCaloriesPerExercise = {};

      Object.values(exercises).forEach(({ exerciseName, MET, sets, reps }) => {
        const effectiveSets = sets > 0 ? sets : 3;
        const effectiveReps = reps > 0 ? reps : 10;
        const duration = effectiveSets * effectiveReps * 0.5;
        const calories = Math.ceil((MET * 3.5 * userWeight * duration) / 200);
        totalCaloriesPerExercise[exerciseName] = calories;
      });

      const workout = {
        type: selectedType,
        name: workoutName,
        exercises: exercises,
        days: selectedDays,
        muscleGroups: muscleGroups,
        totalCalories: totalCalories,
        totalCaloriesPerExercise: totalCaloriesPerExercise,
        isWorkoutDone: false,
      };

      onCreate();
      await addDoc(workoutInfoCollectionRef, workout);

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error("Error submitting workout:", error);
      setFormError("Failed to submit workout. Please try again later.");
    }
  };

  const renderInputFields = (id) => {
    const attributes = exerciseAttributes[id];

    switch (selectedType) {
      case "Strength":
        return (
          <div className={styles.setsRepsWeight}>
            <input
              className={styles.inputContainer}
              type="number"
              placeholder="Sets"
              min="0"
              value={attributes.sets}
              onChange={(e) => handleInputChange(id, "sets", e.target.value)}
            />
            <input
              className={styles.inputContainer}
              type="number"
              placeholder="Reps"
              min="0"
              value={attributes.reps}
              onChange={(e) => handleInputChange(id, "reps", e.target.value)}
            />
            <input
              className={styles.inputContainer}
              type="number"
              placeholder="Weight"
              min="0"
              value={attributes.weight}
              onChange={(e) =>
                handleInputChange(id, "weight", e.target.value)
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h2>{workoutName} Card</h2>
      <p>Total Calories: {totalCalories}</p>
      <div className={styles.groupContainer}>
        <div className={styles.header}>
          <h3>Muscle Group</h3>
          <div className={styles.setsRepsWeightHeader}>
            {selectedType === "Strength" ? (
              <>
                <h3>Sets</h3>
                <h3>Reps</h3>
                <h3>Weight</h3>
              </>
            ) : (
              <>
                <h3>Distance</h3>
                <h3>Speed</h3>
                <h3>Time</h3>
                <h3>Inclination</h3>
              </>
            )}
          </div>
          </div>
      </div>
      {muscleGroups.map((group) => (
        <div key={group} className={styles.exerciseList}>
          <h4>{group}</h4>
          {selectedExercises
            .filter((exercise) => exercise.group === group)
            .map(({ name, id }) => (
              <div key={id} className={styles.exerciseItem}>
                <h4>{name}</h4>
                {renderInputFields(id)}
              </div>
            ))}
        </div>
      ))}
      <button className="button" onClick={handleSubmit}>Submit</button>
      {formError && <p className={styles.error}>{formError}</p>}
    </div>
  );
};

export default Step3;