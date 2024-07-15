import React, { useState, useEffect } from "react";
import styles from "./Step3.module.css";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { useAuthValue } from "../../../../../../contexts/AuthContext";
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
    const groups = [...new Set(selectedExercises.map((exercise) => exercise.group))];
    setMuscleGroups(groups);
  }, [selectedExercises, exerciseAttributes]);

  const setDefaultValues = () => {
    const defaultExerciseAttributes = {};
    selectedExercises.forEach(({ id, name, MET, group }) => {
      let sets = 3;
      let reps = 10;
      let weight = 0;
      let duration = 30;
      let distance = 5;
      let speed = 10;
  
      if (selectedType === "Strength") {
        sets = 3;
        reps = 5;
        weight = 0;
      } else if (selectedType == "Hypertrophy") {
        sets = 3;
        reps = 12;
        weight = 0;
      } else if (selectedType === "Endurance") {
        duration = 45;
        distance = 10;
        speed = 8;
      } else if (selectedType === "Cardio") {
        duration = 30;
        distance = 5;
        speed = 10;
      }
  
      defaultExerciseAttributes[id] = {
        exerciseName: name,
        group: group,
        id: id,
        MET: MET,
        sets: selectedType === "Strength" || selectedType === "Hypertrophy" ? sets : 0,
        reps: selectedType === "Strength" || selectedType === "Hypertrophy" ? reps : 0,
        weight: selectedType === "Strength" || selectedType === "Hypertrophy" ? weight : 0,
        duration: selectedType === "Endurance" || selectedType === "Cardio" ? duration : 0,
        distance: selectedType === "Endurance" || selectedType === "Cardio" ? distance : 0,
        speed: selectedType === "Endurance" || selectedType === "Cardio" ? speed : 0,
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
      const { MET, sets, reps, duration } = exerciseAttributes[key];

      if (selectedType === "Strength" || selectedType === "Hypertrophy" || selectedType === "Endurance") {
        const avgDurationPerRep = 0.1;
        const caloriesPerRep = (MET * 3.5 * userWeight * avgDurationPerRep) / 200;
        const totalCaloriesForExercise = caloriesPerRep * sets * reps;
        totalCalories += totalCaloriesForExercise;
      } else {
        const caloriesPerMinute = (MET * 3.5 * userWeight) / 200;
        const totalCaloriesForExercise = caloriesPerMinute * duration;
        totalCalories += totalCaloriesForExercise;
      }
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
        const { MET, sets, reps, duration } = exercises[key];

        let totalCaloriesForExercise;
        if (selectedType === "Strength" || selectedType === "Hypertrophy" || selectedType === "Endurance") {
          const avgDurationPerRep = 0.1;
          const caloriesPerRep = (MET * 3.5 * userWeight * avgDurationPerRep) / 200;
          totalCaloriesForExercise = caloriesPerRep * sets * reps;
        } else {
          const caloriesPerMinute = (MET * 3.5 * userWeight) / 200;
          totalCaloriesForExercise = caloriesPerMinute * duration;
        }
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
          exerciseName: selectedExercises.find((e) => e.id === key).name,
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

  if (selectedType === "Strength" || selectedType === "Hypertrophy") {
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
  } else if (selectedType === "Endurance" || selectedType === "Cardio") {
    return (
      <div className={styles.setsRepsWeight}>
        <input
          className={styles.inputContainer}
          type="number"
          min="0"
          value={attributes.duration}
          onChange={(e) => handleInputChange(id, "duration", e.target.value)}
        />
        <input
          className={styles.inputContainer}
          type="number"
          min="0"
          value={attributes.distance}
          onChange={(e) => handleInputChange(id, "distance", e.target.value)}
        />
        <input
          className={styles.inputContainer}
          type="number"
          min="0"
          value={attributes.speed}
          onChange={(e) => handleInputChange(id, "speed", e.target.value)}
        />
      </div>
    );
  }

  return null;
};

  return (
    <div className={styles.container}>
      <h2>{t(`${workoutName}`)}</h2>
      <p>Estimated Total Calories Burned: {totalCalories}</p>

      {muscleGroups.map((group) => (
        <div key={group} className={styles.exerciseList}>
          <div className={styles.groupContainer}>
            <div className={styles.header}>
              <h4>{t(`${group}Exercises`)}</h4>
              <div className={styles.setsRepsWeightHeader}>
                {selectedType === "Strength" || selectedType === "Hypertrophy" ? (
                  <>
                    <h4>{t("sets")}</h4>
                    <h4>{t("reps")}</h4>
                    <h4>{t("weight")}</h4>
                  </>
                ) : (
                  <>
                    <h4>{t("duration")}</h4>
                    <h4>{t("distance")}</h4>
                    <h4>{t("speed")}</h4>
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