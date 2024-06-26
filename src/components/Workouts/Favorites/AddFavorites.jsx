import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import styles from "./AddFavorites.module.css";
import ExerciseList from "../../../assets/ExercisesDatabase/ExerciseInfo.json";
import { db } from "../../../firebase/config";
import classNames from "classnames";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { useAuthValue } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const AddFavorites = ({ activeGroup, onAdd, onClose, onFavoriteToggle }) => {
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
    setSelectedExercise(
      ExerciseList[selectedGroup].find(
        (exercise) => exercise.name === e.target.value
      )
    );
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
        `users/${userUid}/isFavorite`
      );
      const exerciseIsFavoriteDocRef = doc(isFavoriteRef, exerciseId);

      await setDoc(exerciseIsFavoriteDocRef, {
        group: selectedGroup,
        name: selectedExercise.name,
        id: exerciseId,
        sets: selectedExercise.sets || 0,
        reps: reps,
        oneRepMax: oneRepMax,
        maxWeight: maxWeight,
      }
    );

      // Optionally, you can call onAdd to notify parent component about the addition
      onFavoriteToggle()
    } catch (error) {
      console.error("Error adding exercise to favorites:", error);
    }
  };

  return (
    <>
      <div className={classNames(styles.addContainer, "card")}>
        <div className={styles.buttonContainer}>
          <h2>{t("addExercise")}</h2>
          <div className={styles.closeButton} onClick={onClose}>
            <FaTimes size={24} color="#999" />
          </div>
        </div>
        <div className={styles.exerciseOptions}>
          <div className={styles.exerciseOption}>
            <p>{t("selectMuscleGroup")}:</p>
            <select
              className={styles.option}
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              <option value={null}>Select Group</option>
              {Object.keys(ExerciseList).map((group) => (
                <option key={group} value={group}>
                  {t(group)}
                </option>
              ))}
            </select>
          </div>
          {selectedGroup && (
            <div className={styles.exerciseOption}>
              <p>{t("selectExercise")}:</p>
              <select
                className={styles.option}
                value={selectedExercise ? selectedExercise.name : ""}
                onChange={handleExerciseChange}
              >
                <option value={null}>{t("selectExercise")}</option>
                {ExerciseList[selectedGroup].map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>
                    {t(exercise.name)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {selectedGroup && selectedExercise && (
          <div className={styles.exerciseOptions}>
            <div className={styles.exerciseOption}>
              <p>{t("enterMaxWeight")}:</p>
              <input
                type="number"
                min="0"
                value={maxWeight}
                onChange={handleMaxWeightChange}
                className={styles.input}
              />
            </div>
            <div className={styles.exerciseOption}>
              <p>{t("enterMaxReps")}:</p>
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
                <p>{t("enter1RM")} (kgs):</p>
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
                    <p>{t("estimated1RM")} (kgs): </p>
                    <input
                      type="text"
                      value={oneRepMax}
                      readOnly={!editOneRepMax}
                      onClick={handleEditOneRepMax}
                      className={styles.input}
                    />
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
        <div className={styles.buttonsContainer}>
          <button className="button" onClick={handleSubmit}>
            {t("save")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFavorites;