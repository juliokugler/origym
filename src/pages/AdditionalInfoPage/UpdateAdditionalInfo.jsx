import React, { useState, useEffect } from "react";
import styles from "./AdditionalInfo.module.css";
import Header from "../../components/Header";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { useAuthValue } from "../../contexts/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const AdditionalInfo = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { user } = useAuthValue();
  const [formError, setFormError] = useState("");
  const [TDEE, setTDEE] = useState(1700);
  const [waterIntake, setWaterIntake] = useState(2.0);
  const [proteinIntake, setProteinIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState(200);
  const [fatIntake, setFatIntake] = useState("");
  const [error, setError] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firestore = getFirestore();
        const userDataRef = doc(firestore, "users", user.uid);
        const docSnapshot = await getDoc(userDataRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  // Function to calculate Total Daily Energy Expenditure (TDEE)
  const calculateTDEE = (
    gender,
    weight,
    height,
    age,
    activityLevel,
    mainGoal
  ) => {
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

    let mainGoalFactor = 0;
    switch (mainGoal) {
      case "Lose Weight":
        mainGoalFactor = -300;
        break;
      case "Gain Weight":
        mainGoalFactor = +500;
        break;
      case "Gain Muscle":
        mainGoalFactor = +300;
        break;
      default:
        break;
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

    const TDEE = (BMR + mainGoalFactor) * activityFactor;
    return TDEE.toFixed(0);
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

  useEffect(() => {
    calculateTDEE();
    calculateWaterIntake();
    calculateProteinIntake();
    calculateCarbsIntake();
    calculateFatIntake();
  }, [age, height, weight, activityLevel, mainGoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userRef = doc(db, `users/${user.uid}`);

    // Prepare data object
    const userData = {
      age: age,
      height: height,
      weight: weight,
      activityLevel: activityLevel,
      mainGoal: mainGoal,
      gender: gender,
      photoURL:
        photoURL ||
        "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd",
      TDEE: TDEE,
      waterIntake: waterIntake,
      proteinIntake: proteinIntake,
      carbsIntake: carbsIntake,
      fatIntake: fatIntake,
    };

    try {
      await setDoc(userRef, userData);
      navigate("/workouts");
    } catch (error) {
      console.error("Error posting weight data:", error);
      setFormError("Error posting weight data. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Header pageType="additionalInfo" />

        <p className={styles.subtext}>
          Submitting these informations is not required for using our website.
          However,{" "}
          <strong>some features will only be available once you do</strong>!
        </p>
        <form>
          <div className={styles.row}>
            <label>
              Gender:{" "}
              <select
                className={styles.inputField}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Age:{" "}
              <input
                className={styles.inputNumberField}
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label>
              Height:{" "}
              <input
                className={styles.inputNumberField}
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>

            <label>
              Weight:{" "}
              <input
                className={styles.inputNumberField}
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Activity Level:{" "}
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
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
          <label>
            What is your main goal?:{" "}
            <select
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Select Activity Level</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Weight">Gain Weight</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="Improve Overall Health">
                Improve Overall Health
              </option>
            </select>
          </label>
          <div className={styles.buttonContainer}>
            <button className={styles.skipButton} onClick={handleSubmit}>
              Skip
            </button>
            <button className={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdditionalInfo;
