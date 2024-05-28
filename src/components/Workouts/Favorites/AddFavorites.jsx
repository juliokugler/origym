import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import styles from "./Favorites.module.css";
import ExerciseList from "../../../assets/ExercisesDatabase/Strength.json";
import { db } from "../../../firebase/config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { useAuthValue } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const AddFavorites = ({ activeGroup, onAdd, onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState(activeGroup);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [maxWeight, setMaxWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [oneRepMax, setOneRepMax] = useState(0);
  const [editOneRepMax, setEditOneRepMax] = useState(false);
  const [newOneRepMax, setNewOneRepMax] = useState("");
  const { user } = useAuthValue();
  const { t } = useTranslation();

  useEffect(() => {
    calculateOneRepMax();
  }, [maxWeight, reps]);

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setSelectedExercise(null);
    setEditOneRepMax(false);
    setOneRepMax("");
    setReps("");
    setMaxWeight("");
  };

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
    setEditOneRepMax(false);
    setOneRepMax("");
    setReps("");
    setMaxWeight("");
  };

  const handleMaxWeightChange = (e) => {
    setMaxWeight(e.target.value);
    setEditOneRepMax(false);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
    setEditOneRepMax(false);
  };

  const calculateOneRepMax = () => {
    if (maxWeight && reps) {
      const weight = parseFloat(maxWeight);
      const repetition = parseInt(reps);
      const calculatedOneRepMax =
        repetition === 1 ? weight : Math.round(weight * (1 + repetition / 30));
      setOneRepMax(calculatedOneRepMax.toString());
    }
  };

  const handleEditOneRepMax = () => {
    setEditOneRepMax(true);
    setNewOneRepMax(oneRepMax);
  };

  const handleNewOneRepMaxChange = (e) => {
    setNewOneRepMax(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const firestore = getFirestore();
      const userUid = user.uid;
      const exerciseId = selectedExercise.id;

      const isFavoriteRef = collection(
        firestore,
        `exercises/${userUid}/isFavorite`
      );
      const exerciseIsFavoriteDocRef = doc(isFavoriteRef, exerciseId);
      const exerciseIsFavoriteDocSnapshot = await getDoc(
        exerciseIsFavoriteDocRef
      );

      await setDoc(exerciseIsFavoriteDocRef, {
        name: selectedExercise,
        id: exerciseId,
        reps: reps,
        group: selectedGroup,
        oneRepMax: oneRepMax,
        maxWeight: maxWeight,
      });

      // Optionally, you can call onAdd to notify parent component about the addition
      if (onAdd) {
        onAdd(selectedGroup);
      }
    } catch (error) {
      console.error("Error adding exercise to favorites:", error);
    }
  };

  return (
    <>
      <div className={styles.addContainer}>
        <div className={styles.buttonContainer}>
          <h2>{t("addExercise")}</h2>
          <div className={styles.closeButton} onClick={onClose}>
            <FaTimes size={24} color="#999" />
          </div>
        </div>
        <div className={styles.exerciseOptions}>
          <div className={styles.exerciseOption}>
            <p>Select Muscle Group:</p>
            <select
              className={styles.option}
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              <option value={null}>Select Group</option>
              {Object.keys(ExerciseList).map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {selectedGroup && (
            <div className={styles.exerciseOption}>
              <p>Select Exercise:</p>
              <select
                className={styles.option}
                value={selectedExercise}
                onChange={handleExerciseChange}
              >
                <option value={null}>Select Exercise</option>
                {ExerciseList[selectedGroup].map((exercise) => (
                  <option key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {selectedGroup && selectedExercise && (
          <div className={styles.exerciseOptions}>
            <div className={styles.exerciseOption}>
              <p>Enter Max Weight:</p>
              <input
                type="number"
                min="0"
                value={maxWeight}
                onChange={handleMaxWeightChange}
                className={styles.input}
              />
            </div>
            <div className={styles.exerciseOption}>
              <p>Enter Max Reps:</p>
              <input
                type="number"
                min="0"
                value={reps}
                onChange={handleRepsChange}
                className={styles.input}
              />
            </div>
            {editOneRepMax ? (
              <div className={styles.exerciseOption}>
                <p>Enter 1RM (One Repetition Maximum) (kgs):</p>
                <input
                  type="number"
                  value={newOneRepMax}
                  onChange={handleNewOneRepMaxChange}
                  placeholder="Enter 1RM"
                />
              </div>
            ) : (
              <>
                {parseFloat(oneRepMax) > 0 && (
                  <div className={styles.exerciseOption}>
                    <p>Estimated 1RM (kgs): </p>
                    <input
                      type="text"
                      value={oneRepMax}
                      readOnly={!editOneRepMax}
                      onClick={handleEditOneRepMax}
                      className={styles.input}
                    />{" "}
                    <FaEdit
                      onClick={handleEditOneRepMax}
                      className={styles.editIcon}
                      size={24}
                      color="#FFF27A"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={handleSubmit} className={styles.button}>
          Save Exercise
        </button>
      </div>
    </>
  );
};

export default AddFavorites;
