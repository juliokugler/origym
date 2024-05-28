import React, { useState, useEffect } from "react";
import styles from "./Confirm.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
const EditContainer = ({
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
  // State variables for storing calculated values
  const [TDEE, setTDEE] = useState(null);
  const [waterIntake, setWaterIntake] = useState(null);
  const [proteinIntake, setProteinIntake] = useState(null);
  const [carbsIntake, setCarbsIntake] = useState(null);
  const [fatIntake, setFatIntake] = useState(null);
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedAge, setUpdatedAge] = useState(age);
  const [updatedHeight, setUpdatedHeight] = useState(height);
  const [updatedWeight, setUpdatedWeight] = useState(weight);
  const [updatedGoalWeight, setUpdatedGoalWeight] = useState(goalWeight);
  const [updatedActivityLevel, setUpdatedActivityLevel] =
    useState(activityLevel);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedGender, setUpdatedGender] = useState(gender);
  const [updatedPhotoURL, setUpdatedPhotoURL] = useState(photoURL);

  const handleInputChange = (field, value) => {
    // Update state using functional form of setState to ensure the latest state is used
    switch (field) {
      case "name":
        setUpdatedName((prevState) => value);
        break;
      case "age":
        setUpdatedAge((prevState) => value);
        break;
      case "height":
        setUpdatedHeight((prevState) => value);
        break;
      case "weight":
        setUpdatedWeight((prevState) => value);
        break;
      case "goalWeight":
        setUpdatedGoalWeight((prevState) => value);
        break;
      case "activityLevel":
        setUpdatedActivityLevel((prevState) => value);
        break;
      case "email":
        setUpdatedEmail((prevState) => value);
        break;
      case "gender":
        setUpdatedGender((prevState) => value);
        break;
      case "photoURL":
        setUpdatedPhotoURL((prevState) => value);
        break;
      default:
        break;
    }

    onCorrect({
      name: updatedName,
      age: updatedAge,
      height: updatedHeight,
      weight: updatedWeight,
      goalWeight: updatedGoalWeight,
      activityLevel: updatedActivityLevel,
      email: updatedEmail,
      gender: updatedGender,
      photoURL: updatedPhotoURL,
    });
  };

  // Function to calculate protein intake
  const calculateProteinIntake = () => {
    let proteinIntake = 0;
    if (gender === "Male") {
      proteinIntake = weight * 2.2; // grams per kg for men
    } else if (gender === "Female") {
      proteinIntake = weight * 2; // grams per kg for women
    } else {
      proteinIntake = weight * 2.1;
    }
    setProteinIntake(proteinIntake.toFixed(1));
  };

  // Function to calculate carbs intake
  const calculateCarbsIntake = () => {
    let carbsIntake = 300; // default value
    switch (activityLevel) {
      case "Lightly Active":
        carbsIntake -= 50;
        break;
      case "Moderately Active":
        carbsIntake -= 100;
        break;
      case "Very Active":
        carbsIntake -= 150;
        break;
      case "Highly Active":
        carbsIntake -= 200;
        break;
      default:
        break;
    }
    setCarbsIntake(carbsIntake.toFixed(1));
  };

  // Function to calculate fat intake
  const calculateFatIntake = () => {
    let fatIntake = 0;
    if (gender === "Male") {
      fatIntake = weight * 0.4; // grams per kg for men
    } else if (gender === "Female") {
      fatIntake = weight * 0.3; // grams per kg for women
    } else {
      fatIntake = (weight * 0.4 + weight * 0.3) / 2;
    }
    setFatIntake(fatIntake.toFixed(1));
  };

  return (
    <div>
      <div className={styles.infoContainer}>
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <img src={photoURL}></img>
            <label>
              Photo URL:
              <input
                className={styles.photoInput}
                type="URL"
                value={updatedPhotoURL}
                onChange={(e) => handleInputChange("photoURL", e.target.value)}
              ></input>
            </label>
          </div>
        </div>

        <div className={styles.column}>
          <label>
            Name:
            <input
              className={styles.mainInfoField}
              type="text"
              value={updatedName}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              className={styles.mainInfoField}
              type="number"
              value={updatedAge}
              onChange={(e) => handleInputChange("age", e.target.value)}
            />
          </label>
          <label>
            Gender:
            <select
              className={styles.inputField}
              value={updatedGender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Email:
            <input
              className={styles.mainInfoField}
              type="email"
              value={updatedEmail}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </label>
        </div>
        <div className={styles.column}>
          <label>
            Height:
            <input
              className={styles.mainInfoField}
              type="number"
              value={updatedHeight}
              onChange={(e) => handleInputChange("height", e.target.value)}
            />
          </label>
          <label>
            Current Weight:
            <input
              className={styles.mainInfoField}
              type="number"
              value={updatedWeight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </label>
          <label>
            Goal Weight:
            <input
              className={styles.mainInfoField}
              type="number"
              value={updatedGoalWeight}
              onChange={(e) => handleInputChange("goalWeight", e.target.value)}
            />
          </label>
          <label>
            Activity Level:
            <select
              value={updatedActivityLevel}
              onChange={(e) =>
                handleInputChange("activityLevel", e.target.value)
              }
              className={styles.inputField}
            >
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
              <option value="Highly Active">Highly Active</option>
            </select>
          </label>
        </div>
      </div>{" "}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditContainer;
