import { useState } from "react";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthValue } from "../contexts/AuthContext";

const useRemoveFavorites = () => {
  const { user } = useAuthValue();

  const removeFavorite = async (groupId, exerciseId) => {
    try {
      const firestore = getFirestore();
      const userUid = user.uid;

      const isFavoriteRef = doc(
        firestore,
        `exercises/${userUid}/isFavorite`,
        exerciseId
      );
      const isFavoriteDocSnapshot = await getDoc(isFavoriteRef);

      if (isFavoriteDocSnapshot.exists()) {
        await deleteDoc(isFavoriteRef);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return { removeFavorite };
};

export default useRemoveFavorites;
