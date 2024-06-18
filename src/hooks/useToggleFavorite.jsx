import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthValue } from "../contexts/AuthContext";

const useToggleFavorite = (exercise, onFavoriteToggle) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);
  const [starColor, setStarColor] = useState("#c0c0c0");

  const { user } = useAuthValue();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const firestore = getFirestore();
        const userUid = user.uid;
        const exerciseId = exercise.id;

        const isFavoriteRef = collection(
          firestore,
          `users/${userUid}/isFavorite`
        );
        const exerciseIsFavoriteDocRef = doc(isFavoriteRef, exerciseId);
        const exerciseIsFavoriteDocSnapshot = await getDoc(
          exerciseIsFavoriteDocRef
        );

        if (exerciseIsFavoriteDocSnapshot.exists()) {
          console.log(`Exercise ${exerciseId} is a favorite.`);
          setIsFavorite(true);
          setStarColor("#FFF27A");
        } else {
          console.log(`Exercise ${exerciseId} is not a favorite.`);
          setIsFavorite(false);
          setStarColor("#c0c0c0");
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [exercise.id, user.uid]);

  const toggleFavorite = async () => {
    try {
      if (toggleDisabled) return;

      setToggleDisabled(true);

      const firestore = getFirestore();
      const userUid = user.uid;
      const exerciseId = exercise.id;

      const isFavoriteRef = collection(
        firestore,
        `users/${userUid}/isFavorite`
      );
      const exerciseIsFavoriteDocRef = doc(isFavoriteRef, exerciseId);
      const exerciseIsFavoriteDocSnapshot = await getDoc(
        exerciseIsFavoriteDocRef
      );

      if (exerciseIsFavoriteDocSnapshot.exists()) {
        await deleteDoc(exerciseIsFavoriteDocRef);
        console.log(`Removed exercise ${exerciseId} from favorites.`);
        setIsFavorite(false);
        setStarColor("#c0c0c0");
        onFavoriteToggle()
      } else {
        await setDoc(exerciseIsFavoriteDocRef, {
          group: exercise.group,
          name: exercise.name,
          id: exercise.id,
          sets: exercise.sets || 0,
          reps: exercise.reps || 0,
          oneRepMax: exercise.oneRepMax || 0,
          maxWeight: exercise.maxWeight || 0,
        });
        console.log(`Added exercise ${exerciseId} to favorites.`);
        setIsFavorite(true);
        setStarColor("#FFF27A");
        onFavoriteToggle()
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setToggleDisabled(false);
    }
  };

  return { toggleFavorite, starColor, isFavorite };
};

export default useToggleFavorite;
