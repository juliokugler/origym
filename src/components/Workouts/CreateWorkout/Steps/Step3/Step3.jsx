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
  currentLanguage,
  t,
}) => {
  const { user } = useAuthValue();
  const [exerciseAttributes, setExerciseAttributes] = useState({});
  const [formError, setFormError] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    if (selectedExercises && Array.isArray(selectedExercises)) {
      setDefaultValues();
    }
  }, [selectedExercises]);

  useEffect(() => {
    calculateTotalCalories();
    const groups = [...new Set(selectedExercises.map(exercise => exercise.group))];
    setMuscleGroups(groups);
  }, [selectedExercises, exerciseAttributes]);

  const setDefaultValues = () => {
    const defaultExerciseAttributes = {};
    selectedExercises.forEach(({ id, name, MET, group }) => {
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
    let totalCalories = 0;

    for (const key in exerciseAttributes) {
      const { MET, sets, reps } = exerciseAttributes[key];

      const avgDurationPerRep = 0.1;
      const caloriesPerRep = (MET * 3.5 * userWeight * avgDurationPerRep) / 200;
      const totalCaloriesForExercise = caloriesPerRep * sets * reps;
      totalCalories += totalCaloriesForExercise;
    }

    setTotalCalories(Math.ceil(totalCalories));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const workoutInfoCollectionRef = collection(userDocRef, "workouts");

      const exercises = exerciseAttributes;
      const totalCaloriesPerExercise = {};

      for (const key in exercises) {
        const { MET, sets, reps } = exercises[key];
        const avgDurationPerRep = 0.1;
        const caloriesPerRep = (MET * 3.5 * userWeight * avgDurationPerRep) / 200;
        const totalCaloriesForExercise = caloriesPerRep * sets * reps;
        totalCaloriesPerExercise[exercises[key].exerciseName] = Math.ceil(totalCaloriesForExercise);
      }

      const workout = {
        type: selectedType,
        name: workoutName,
        exercises: {},
        days: selectedDays,
        muscleGroups: muscleGroups,
        totalCalories: totalCalories,
        totalCaloriesPerExercise: totalCaloriesPerExercise,
        isWorkoutDone: false,
      };

      for (const key in exercises) {
        const exercise = exercises[key];
        workout.exercises[key] = {
          ...exercise,
          exerciseName: selectedExercises.find(e => e.id === key).name, // Store exercise name in English
        };
      }

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

    if (!attributes) return null;

    switch (selectedType) {
      case "Strength":
        return (
          <div className={styles.setsRepsWeight}>
            <input
              className={styles.inputContainer}
              type="number"
              min="0"
              value={attributes.sets}
              onChange={(e) => handleInputChange(id, "sets", e.target.value)}
            />
            <input
              className={styles.inputContainer}
              type="number"
              min="0"
              value={attributes.reps}
              onChange={(e) => handleInputChange(id, "reps", e.target.value)}
            />
            <input
              className={styles.inputContainer}
              type="number"
              min="0"
              value={attributes.weight}
              onChange={(e) => handleInputChange(id, "weight", e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h2>{workoutName}</h2>
      <p>Estimated Total Calories Burned: {totalCalories}</p>

      {muscleGroups.map((group) => (
        <div key={group} className={styles.exerciseList}>
          <div className={styles.groupContainer}>
            <div className={styles.header}>
              <h4>{t(`${group}Exercises`)}</h4>
              <div className={styles.setsRepsWeightHeader}>
                {selectedType === "Strength" ? (
                  <>
                    <h4>{t("sets")}</h4>
                    <h4>{t("reps")}</h4>
                    <h4>{t("weight")}</h4>
                  </>
                ) : (
                  <>
                    <h4>{t("distance")}</h4>
                    <h4>{t("speed")}</h4>
                    <h4>{t("time")}</h4>
                    <h4>{t("inclination")}</h4>
                  </>
                )}
              </div>
            </div>
          </div>

          {selectedExercises
            .filter((exercise) => exercise.group === group)
            .map(({ name, id }) => (
              <div key={id} className={styles.exerciseItem}>
                <p>{t(`${name}`)}</p>
                {renderInputFields(id)}
              </div>
            ))}
        </div>
      ))}
      <button className="button" onClick={handleSubmit}>
        {t("submit")}
      </button>
      {formError && <p className={styles.error}>{formError}</p>}
    </div>
  );
};

export default Step3;