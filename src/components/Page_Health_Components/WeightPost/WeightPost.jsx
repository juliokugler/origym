import React, { useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import styles from "./WeightPost.module.css";
import { Timestamp } from "firebase/firestore";
import { useAuthValue } from "../../../contexts/AuthContext";

const WeightPost = ({ onClose, onCorrectSubmit }) => {
  const { user } = useAuthValue();
  const [weight, setWeight] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const firestore = getFirestore();
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}${today.getFullYear()}`;
      const userWeightDocumentRef = doc(
        firestore,
        `health/${user.uid}/weight`,
        formattedDate
      );
      const weightData = {
        date: Timestamp.fromDate(new Date()),
        weight: parseFloat(weight),
      };

      await setDoc(userWeightDocumentRef, weightData); // Create new entry or overwrite existing

      console.log("Weight data added successfully!");
      setWeight("");
      onClose();
    } catch (error) {
      console.error("Error posting weight data:", error);
      setFormError("Error posting weight data. Please try again.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Update your Weight</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Weight:
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          {formError && <p className={styles.error}>{formError}</p>}
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default WeightPost;
