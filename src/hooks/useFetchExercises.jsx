import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { useAuthValue } from "../contexts/AuthContext";

const useFetchExercises = (workoutChange, workoutCheck) => {
  const { user } = useAuthValue();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchExercisesFromFirestore = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User or user ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userWorkoutsRef = collection(userDocRef, "workouts");
        const userWorkoutsSnapshot = await getDocs(userWorkoutsRef);

        const fetchedWorkouts = [];

        userWorkoutsSnapshot.forEach((doc) => {
          const workout = doc.data();
          const exercises = workout.exercises || {};

          const muscleGroups = Object.values(exercises).map(
            (exercise) => exercise.group
          );
          const uniqueMuscleGroups = Array.from(new Set(muscleGroups));

          fetchedWorkouts.push({
            id: doc.id, // Firebase-generated ID as the ID prop
            days: workout.days || [], // Assuming days is an array of strings
            name: workout.name || "",
            type: workout.type,
            isWorkoutDone: workout.isWorkoutDone,
            totalCalories: workout.totalCalories,
            muscleGroups: uniqueMuscleGroups,
            totalExercises: Object.keys(exercises).length,
            description: workout.description || "Description goes here",
            exercises: Object.values(exercises).map((exercise) => ({
              isDone: exercise.isDone,
              group: exercise.group,
              id: exercise.id,
              name: exercise.exerciseName,
              sets: exercise.sets,
              reps: exercise.reps,
              weight: exercise.weight,
              difficulty: exercise.difficulty,
              duration: exercise.duration,
              inclination: exercise.inclination,
              distance: exercise.distance,
              time: exercise.time,
              speed: exercise.speed,
              pace: exercise.pace,
            })),
          });
        });

        setWorkouts(fetchedWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchExercisesFromFirestore();
  }, [workoutChange, workoutCheck]);

  return workouts;
};

export default useFetchExercises;
