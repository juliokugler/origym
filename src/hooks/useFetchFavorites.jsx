import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { useAuthValue } from "../contexts/AuthContext";

const useFetchFavorites = (favoriteChange) => {
  const [groups, setGroups] = useState({});
  const [activeGroup, setActiveGroup] = useState(null);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const { user } = useAuthValue();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userUid = user.uid;
        const favoritesRef = collection(db, `users/${userUid}/isFavorite`);
        const snapshot = await getDocs(favoritesRef);

        const groupsData = {};
        snapshot.forEach((doc) => {
          const exerciseData = doc.data();
          const exerciseId = doc.id;
          const group = exerciseData.group || "Ungrouped"; // Default to "Ungrouped" if no group specified

          if (!groupsData[group]) {
            groupsData[group] = [];
          }
          groupsData[group].push({ id: exerciseId, ...exerciseData });
        });

        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching exercise groups:", error);
      }
    };

    fetchFavorites();
  }, [user, favoriteChange]);

  const removeFavorite = async (exerciseId) => {
    try {
      const firestore = getFirestore();
      const userUid = user.uid;

      const isFavoriteRef = doc(
        firestore,
        `users/${userUid}/isFavorite`,
        exerciseId
      );
      const isFavoriteDocSnapshot = await getDoc(isFavoriteRef);

      if (isFavoriteDocSnapshot.exists()) {
        await deleteDoc(isFavoriteRef);

        setGroups((prevGroups) => {
          const newGroups = { ...prevGroups };
          Object.keys(newGroups).forEach((group) => {
            newGroups[group] = newGroups[group].filter(
              (exercise) => exercise.id !== exerciseId
            );
          });
          return newGroups;
        });
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const toggleGroup = (groupId) => {
    setActiveGroup(groupId === activeGroup ? null : groupId);
    setShowAddExercise(false);
  };

  const handleOpenSetExercise = () => {
    setShowAddExercise(true);
  };

  const handleCloseSetExercise = () => {
    setShowAddExercise(false);
  };

  return {
    groups,
    activeGroup,
    toggleGroup,
    showAddExercise,
    setShowAddExercise,
    removeFavorite,
    handleOpenSetExercise,
    handleCloseSetExercise,
  };
};

export default useFetchFavorites;
