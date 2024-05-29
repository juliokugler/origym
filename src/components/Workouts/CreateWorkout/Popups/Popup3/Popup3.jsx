import React, { useState, useEffect } from "react";
import styles from "./Popup3.module.css";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { useAuthValue } from "../../../../../contexts/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";

const Popup3 = ({
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
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    setDefaultValues();
  }, [selectedExercises]);

  useEffect(() => {
    const groups = [
      ...new Set(selectedExercises.map((exercise) => exercise.group)),
    ];
    setMuscleGroups(groups);
    console.log("Selected Exercises:", selectedExercises);
  }, [selectedExercises]);

  useEffect(() => {
    calculateTotalCalories();
  }, [exerciseAttributes]);

  const setDefaultValues = () => {
    const defaultExerciseAttributes = {};
    selectedExercises.forEach(({ group, exercise, id, MET }) => {
      defaultExerciseAttributes[id] = {
        exerciseName: exercise,
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
      const exercises = exerciseAttributes; // use the attributes with ids as keys
      const totalCaloriesPerExercise = {};

      Object.values(exercises).forEach(({ exerciseName, MET, sets, reps }) => {
        const effectiveSets = sets > 0 ? sets : 3;
        const effectiveReps = reps > 0 ? reps : 10;
        const duration = effectiveSets * effectiveReps * 0.5; // Assuming each rep takes 30 seconds
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
      // Add the workout to Firestore under workouts/workoutInfo
      await addDoc(workoutInfoCollectionRef, workout);

      // If there's a callback function, call it
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
          <>
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
              onChange={(e) => handleInputChange(id, "weight", e.target.value)}
            />
          </>
        );
      case "Cardio":
        return (
          <>
            <input
              type="number"
              placeholder="Distance"
              min="0"
              value={attributes.distance}
              onChange={(e) =>
                handleInputChange(id, "distance", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Speed"
              min="0"
              value={attributes.speed}
              onChange={(e) => handleInputChange(id, "speed", e.target.value)}
            />
            <input
              type="number"
              placeholder="Time"
              min="0"
              value={attributes.time}
              onChange={(e) => handleInputChange(id, "time", e.target.value)}
            />
            <input
              type="number"
              placeholder="Inclination"
              min="0"
              value={attributes.inclination}
              onChange={(e) =>
                handleInputChange(id, "inclination", e.target.value)
              }
            />
          </>
        );
      case "Yoga":
        return (
          <>
            <div>{renderDifficultyStars(attributes.difficulty)}</div>
            <input
              type="number"
              placeholder="Duration (minutes)"
              min="0"
              value={attributes.duration}
              onChange={(e) =>
                handleInputChange(id, "duration", e.target.value)
              }
            />
          </>
        );

      default:
        return null;
    }
  };

  const renderDifficultyStars = (difficulty) => {
    const filledStars = Math.floor(difficulty / 2);
    const halfStar = difficulty % 2 === 1;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (halfStar) {
      stars.push(<FaStar key="half" />);
    }

    // If there are less than 5 filled stars, add empty stars to make a total of 5 stars
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={i + filledStars + (halfStar ? 1 : 0)} />);
    }

    return stars;
  };

  return (
    <div className={styles.container}>
      <h2>{workoutName} Card</h2>
      <p>Total Calories: {totalCalories}</p>
      {muscleGroups.map((group) => (
        <div key={group} className={styles.groupContainer}>
          <div className={styles.header}>
            <h3 className={styles.groupName}>{group}</h3>
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
          <div className={styles.exerciseList}>
            {selectedExercises
              .filter((exercise) => exercise.group === group)
              .map(({ group, exercise, id }) => (
                <div key={id} className={styles.exerciseItem}>
                  <h4>{exercise}</h4>
                  <div className={styles.setsRepsWeight}>
                    {renderInputFields(id)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <button className="button" onClick={handleSubmit}>Submit</button>
      {formError && <p className={styles.error}>{formError}</p>}
    </div>
  );
};

export default Popup3;
