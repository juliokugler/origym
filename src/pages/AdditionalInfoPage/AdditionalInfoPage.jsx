import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import styles from "./AdditionalInfoPage.module.css";
import { FaEdit } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { useAuthValue } from "../../contexts/AuthContext";
import useFetchUserData from "../../hooks/useFetchUserData";
import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";

const AdditionalInfo = ({ t }) => {
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const userData = useFetchUserData(user);

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
    if (userData) {
      setAge(userData.age || "");
      setHeight(userData.height || "");
      setWeight(userData.weight || "");
      setCurrentWeight(userData.weight || "");
      setActivityLevel(userData.activityLevel || "");
      setGender(userData.gender || "");
      setWeightGoal(userData.weightGoal || "");
      setTDEE(userData.TDEE || 2000);
      setWaterIntake(userData.waterIntake || 2.0);
      setProteinIntake(userData.proteinIntake || 110);
      setCarbsIntake(userData.carbsIntake || 250);
      setFatIntake(userData.fatIntake || 50);
      setMainGoal(userData.mainGoal || "Improve Health");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !age ||
      !height ||
      !weight ||
      !currentWeight ||
      !activityLevel ||
      !gender ||
      !weightGoal
    ) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    const firestore = getFirestore();

    const userData = {
      age,
      height,
      weight,
      currentWeight,
      activityLevel,
      gender,
      weightGoal,
      TDEE,
      waterIntake,
      proteinIntake,
      carbsIntake,
      fatIntake,
      mainGoal,
    };

    try {
      const userProfileRef = doc(
        collection(firestore, "users", user.uid, "userInfo"),
        "userProfile"
      );
      await setDoc(userProfileRef, userData);

      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <Header t={t} />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Additional Info</h2>
        </div>
        <form className={styles.additionalInfoForm} onSubmit={handleSubmit}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label htmlFor="weight">Initial Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label htmlFor="currentWeight">Current Weight:</label>
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
          />

          <label htmlFor="activityLevel">Activity Level:</label>
          <input
            type="text"
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          />

          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label htmlFor="weightGoal">Weight Goal:</label>
          <input
            type="text"
            id="weightGoal"
            value={weightGoal}
            onChange={(e) => setWeightGoal(e.target.value)}
          />

          <button type="submit"> Submit</button>

          {formError && <p className={styles.error}>{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfo;
