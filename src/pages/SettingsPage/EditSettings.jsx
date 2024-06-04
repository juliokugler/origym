//React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Firebase
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";

//Styles
import styles from "./Settings.module.css";
import { FaEdit } from "react-icons/fa";

//Components
import Header from "../../components/Header/Header";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";

//Hooks
import { useTranslation } from "react-i18next";

import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";

const EditSettings = ({ userData, user, dailyInfo }) => {
  const { t } = useTranslation();
  if (user && !userData || user && !dailyInfo) {
    return <p>{t("loading")}...</p>;
  }
  const navigate = useNavigate();

  const [age, setAge] = useState(userData.age || "");
  const [height, setHeight] = useState(userData.height || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [currentWeight, setCurrentWeight] = useState(userData.weight || "");
  const [activityLevel, setActivityLevel] = useState(
    userData.activityLevel || ""
  );
  const [gender, setGender] = useState(userData.gender || "");
  const [weightGoal, setWeightGoal] = useState(userData.weightGoal || "");
  const [formError, setFormError] = useState("");
  const [TDEE, setTDEE] = useState(1700);
  const [waterIntake, setWaterIntake] = useState(2.0);
  const [proteinIntake, setProteinIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState(200);
  const [fatIntake, setFatIntake] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  const handleShowChangePhoto = () => {
    setShowChangePhoto((prev) => !prev);
  };

  useEffect(() => {
    setGender(userData.gender);
    setHeight(userData.height);
    setWeight(userData.weight);
    setCurrentWeight(userData.weight);
    setWeightGoal(userData.weightGoal);
    setActivityLevel(userData.activityLevel);
  }, [userData]);

  useEffect(() => {
    // Calculate metrics when component mounts
    calculateTDEE();
    calculateWaterIntake();
    calculateProteinIntake();
    calculateCarbsIntake();
    calculateFatIntake();
  }, [age, height, weight, weightGoal, activityLevel]);

  const calculateTDEE = () => {
    // Calculate TDEE based on user's profile information
    let BMR = 0;
    if (gender === "Male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender === "Female") {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      BMR =
        (88.362 +
          13.397 * weight +
          4.799 * height -
          5.677 * age +
          447.593 +
          9.247 * weight +
          3.098 * height -
          4.33 * age) /
        2;
    }

    let activityFactor = 1.2;

    switch (activityLevel) {
      case "Lightly Active":
        activityFactor = 1.375;
        break;
      case "Moderately Active":
        activityFactor = 1.55;
        break;
      case "Very Active":
        activityFactor = 1.725;
        break;
      case "Highly Active":
        activityFactor = 1.9;
        break;
      default:
        break;
    }

    let difference = 0;
    if (weight < weightGoal) {
      difference = 300;
    } else if (weight > weightGoal) {
      difference = -300;
    }

    const TDEE = BMR * activityFactor + difference;

    setTDEE(TDEE.toFixed(0));
  };

  // Function to calculate water intake
  const calculateWaterIntake = () => {
    let waterIntake = 35 * weight; // ml per kg
    if (gender === "Female") {
      waterIntake *= 0.9; // reduce for females
    }

    switch (activityLevel) {
      case "Lightly Active":
        waterIntake *= 1.1;
        break;
      case "Moderately Active":
        waterIntake *= 1.2;
        break;
      case "Very Active":
        waterIntake *= 1.3;
        break;
      case "Highly Active":
        waterIntake *= 1.4;
        break;
      default:
        break;
    }

    setWaterIntake((waterIntake / 1000).toFixed(2));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userRef = doc(db, `users/${user.uid}`);

    // Prepare data object
    const userData = {
      age: age,
      height: height,
      initialWeight: weight,
      currentWeight: weight,
      activityLevel: activityLevel,
      gender: gender,
      TDEE: TDEE,
      waterIntake: waterIntake,
      proteinIntake: proteinIntake,
      carbsIntake: carbsIntake,
      fatIntake: fatIntake,
      weightGoal: weightGoal,
    };

    try {
      // Create a userInfo subcollection under the user document
      const userInfoRef = collection(userRef, "userInfo");
      await setDoc(doc(userInfoRef, "userProfile"), userData);

      // Update currentWeight in dailyInfo document
      const currentDate = new Date().toISOString().slice(0, 10);
      const dailyInfoRef = doc(
        db,
        `users/${user.uid}/dailyInfo/${currentDate}`
      );
      await setDoc(dailyInfoRef, { currentWeight: weight }, { merge: true });

      navigate("/workouts");
    } catch (error) {
      console.error("Error posting weight data:", error);
      setFormError("Error posting weight data. Please try again.");
    }
  };

  return (
    <div className={styles.mainInfo}>
      <div className={styles.avatar}>
        <div className={styles.editButton} onClick={handleShowChangePhoto}>
          <FaEdit />
        </div>
      </div>
      {showChangePhoto && <ChangePhotoURL onClose={handleShowChangePhoto} />}
      <form>
        <div className={styles.row}>
          {/* Gender */}
          <label>
            {t("genderLabel")}:{" "}
            <select
              className={styles.inputField}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">{t("selectGender")}</option>
              <option value="Male">{t("male")}</option>
              <option value="Female">{t("female")}</option>
              <option value="Other">{t("other")}</option>
            </select>
          </label>
          {/* Age */}
          <label>
            {t("ageLabel")}:{" "}
            <input
              className={styles.inputNumberField}
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          {/* Height */}
          <label>
            {t("heightLabel")}:{" "}
            <input
              className={styles.inputNumberField}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          {/* Weight */}
          <label>
            {t("weightLabel")}:{" "}
            <input
              className={styles.inputNumberField}
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          {/* Weight Goal */}
          <label>
            Weight Goal:{" "}
            <input
              className={styles.inputNumberField}
              type="number"
              value={weightGoal}
              onChange={(e) => setWeightGoal(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.row}>
          {/* Main Goal */}
          <label>
            What is your main goal?:{" "}
            <select
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Select Main Goal</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Weight">Gain Weight</option>
              <option value="Gain Muscles">Gain Muscles</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="Improve Overall Health">
                Improve Overall Health
              </option>
            </select>
          </label>
          {/* Activity Level */}
          <label>
            {t("activityLevelLabel")}:{" "}
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className={styles.inputField}
            >
              <option value="">{t("selectActivityLevel")}</option>
              <option value="Sedentary">{t("sedentary")}</option>
              <option value="Lightly Active">{t("lightlyActive")}</option>
              <option value="Moderately Active">{t("moderatelyActive")}</option>
              <option value="Very Active">{t("veryActive")}</option>
              <option value="Highly Active">{t("highlyActive")}</option>
            </select>
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.skipButton} onClick={handleSubmit}>
            {t("skip")}
          </button>
          <button className={styles.button} onClick={handleSubmit}>
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSettings;
