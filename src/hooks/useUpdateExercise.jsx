import { useState } from "react";
import { db } from "../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const useUpdateExercise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExerciseInFirebase = async (
    userId,
    workoutId,
    exerciseId,
    updatedAttributes // New parameter to specify exercise attributes to update
  ) => {
    setLoading(true);
    setError(null);

    try {
      const workoutRef = doc(db, `users/${userId}/workouts/${workoutId}`);
      const workoutSnap = await getDoc(workoutRef);

      if (workoutSnap.exists()) {
        const workoutData = workoutSnap.data();

        // Get the existing exercise object
        const existingExercise = workoutData.exercises[exerciseId];

        // Merge the updated attributes with existing attributes, skipping undefined values
        const updatedExercise = {
          ...existingExercise,
          ...updatedAttributes,
        };

        // Update the exercises object in the workout document
        const updatedExercises = {
          ...workoutData.exercises,
          [exerciseId]: updatedExercise,
        };

        await updateDoc(workoutRef, { exercises: updatedExercises });
        setLoading(false);
      } else {
        throw new Error("Workout document not found");
      }
    } catch (err) {
      console.error("Error updating exercise:", err);
      setError(err);
      setLoading(false);
    }
  };

  return { updateExerciseInFirebase, loading, error };
};

export default useUpdateExercise;
