import React, { useState, useEffect } from "react";
import styles from "./Confirm.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import {
  useTDEECalculation,
  useWaterIntakeCalculation,
  useProteinIntakeCalculation,
  useCarbsIntakeCalculation,
  useFatIntakeCalculation,
} from "../../hooks/metricCalculationHooks";

const ConfirmContainer = ({
  name,
  gender,
  age,
  email,
  height,
  weight,
  goalWeight,
  activityLevel,
  photoURL,
  onCorrect,
}) => {
  const [error, setError] = useState("");
  const { loading } = useAuthentication();

  // Calculate metrics using custom hooks
  const TDEE = useTDEECalculation(
    gender,
    age,
    height,
    weight,
    goalWeight,
    activityLevel
  );
  const waterIntake = useWaterIntakeCalculation(gender, weight, activityLevel);
  const proteinIntake = useProteinIntakeCalculation(gender, weight);
  const carbsIntake = useCarbsIntakeCalculation(activityLevel);
  const fatIntake = useFatIntakeCalculation(gender, weight);

  useEffect(() => {
    // Pass calculated metrics to the parent component
    onCorrect(TDEE, waterIntake, proteinIntake, carbsIntake, fatIntake);
  }, [TDEE, waterIntake, proteinIntake, carbsIntake, fatIntake]);

  return (
    <div>
      <div className={styles.infoContainer}>
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <img src={photoURL} alt="User" />
          </div>
        </div>

        <div className={styles.column}>
          <p>
            Name: <span>{name}</span>{" "}
          </p>
          <p>
            Age: <span>{age}</span>
          </p>
          <p>
            Gender: <span>{gender}</span>
          </p>
          <p>
            Email: <span>{email}</span>
          </p>
        </div>
        <div className={styles.column}>
          <p>
            Height:{" "}
            <span>
              {height} {height && "cm"}
            </span>
          </p>
          <p>
            Current Weight:{" "}
            <span>
              {weight} {weight && "Kg"}
            </span>
          </p>
          <p>
            Goal Weight:{" "}
            <span>
              {goalWeight} {goalWeight && "Kg"}
            </span>
          </p>
          <p>
            Activity Level: <span>{activityLevel}</span>
          </p>
        </div>
      </div>{" "}
      <div className={styles.intakes}>
        <h2>Estimated Daily Intakes</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>TDEE</h3>
            <p className={styles.intake}>
              <strong>
                <span>{TDEE}Kcal</span>
              </strong>
            </p>
          </div>
          <div className={styles.card}>
            <h3>Water</h3>
            <p className={styles.intake}>
              <strong>
                <span>{waterIntake}L</span>
              </strong>
            </p>
          </div>
          <div className={styles.card}>
            <h3>Protein</h3>
            <p className={styles.intake}>
              <strong>
                <span>{proteinIntake}g</span>
              </strong>
            </p>
          </div>
          <div className={styles.card}>
            <h3>Carbs</h3>
            <p className={styles.intake}>
              <strong>
                <span>{carbsIntake}g</span>
              </strong>
            </p>
          </div>
          <div className={styles.card}>
            <h3>Fat</h3>
            <p className={styles.intake}>
              <strong>
                <span>{fatIntake}g</span>
              </strong>
            </p>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ConfirmContainer;
