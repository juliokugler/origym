//React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Style
import styles from "./Onboarding.module.css";
import backgroundImage from "./bg.png";

//Firebase
import { updateProfile } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

//Hooks 
import { 
useTDEECalculation, 
useWaterIntakeCalculation, 
useProteinIntakeCalculation, 
useCarbsIntakeCalculation, 
useFatIntakeCalculation 
} from "../../hooks/metricCalculationHooks";
import useFormData from "../../hooks/useFormData";
import useImageLoad from "../../hooks/useImageLoad";

//Components
import StepIndicator from "../../components/StepIndicator/StepIndicator";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";

//Page Components
import UserInfoStep from "./components/UserInfoStep/UserInfoStep";
import PhysicalInfoStep from "./components/PhysicalInfoStep/PhysicalInfoStep";
import ActivityGoalStep from "./components/ActivityGoalStep/ActivityGoalStep";

//Contexts
import { useUserData } from "../../contexts/UserDataContext";


const Onboarding = ({ switchLanguage, t, user, userUid }) => {
  const [language, setLanguage] = useState("pt");
  const { userData: contextUserData, setUserInfoChange } = useUserData();
  const { userData, setUserData, handleChange, handleGoalChange, handleActivityLevelChange } = useFormData(user, contextUserData);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const TDEE = useTDEECalculation(userData.gender, userData.age, userData.height, userData.weight, userData.weightGoal, userData.activityLevel);
  const waterIntake = useWaterIntakeCalculation(userData.gender, userData.weight, userData.activityLevel);
  const proteinIntake = useProteinIntakeCalculation(userData.gender, userData.weight);
  const carbsIntake = useCarbsIntakeCalculation(userData.activityLevel);
  const fatIntake = useFatIntakeCalculation(userData.gender, userData.weight);
  const isImageLoaded = useImageLoad(backgroundImage);

  useEffect(() => {
    setUserInfoChange();
    if (contextUserData) {
      setUserData((prevState) => ({
        ...prevState,
        displayName: `${contextUserData.userProfile.firstName}${contextUserData.userProfile.lastName}`,
      }));
    }
  }, [contextUserData, setUserData, setUserInfoChange]);

  if (!contextUserData) {
    setUserInfoChange(true);
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

  if (!isImageLoaded) {
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: userData.displayName,
        photoURL: userData.newPhotoURL || user.photoURL,
      });

      const updatedUserData = {
        ...userData,
        firstName: contextUserData.userProfile.firstName,
        lastName: contextUserData.userProfile.lastName,
        displayName: userData.displayName,
        displayNameLower: userData.displayName.toLowerCase(),
        photoURL: userData.newPhotoURL || user.photoURL,
        TDEE: Number(TDEE),
        waterIntake: Number(waterIntake),
        proteinIntake: Number(proteinIntake),
        carbsIntake: Number(carbsIntake),
        fatIntake: Number(fatIntake),
        bio: "",
      };

      await setDoc(doc(db, `users/${userUid}`), updatedUserData);

      setUserInfoChange((prev) => !prev); // Trigger re-fetching of user data in the context

      const currentDate = new Date().toISOString().split("T")[0];
      const dailyInfoRef = doc(db, `users/${userUid}/dailyInfo/`, currentDate);
      const dailyInfoDoc = await getDoc(dailyInfoRef);

      if (dailyInfoDoc.exists()) {
        await setDoc(dailyInfoRef, { TDEE: Number(TDEE) }, { merge: true });
      } else {
        await setDoc(dailyInfoRef, {
          TDEE: Number(TDEE),
          caloriesConsumed: 0,
          carbsConsumed: 0,
          fatConsumed: 0,
          proteinConsumed: 0,
          sleep: 0,
          stepsTaken: 0,
          waterConsumed: 0,
          workoutsDone: 0,
        });
      }

      console.log("User info updated successfully");
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error("Error updating user info:", error);
      setLoading(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return userData.displayName && userData.displayName.trim() !== "";
    } else if (step === 2) {
      return (
        userData.age &&
        userData.height &&
        userData.weight &&
        userData.gender &&
        userData.age.trim() !== "" &&
        userData.height.trim() !== "" &&
        userData.weight.trim() !== "" &&
        userData.gender.trim() !== ""
      );
    }
    return true;
  };

  return (
    <div className={styles.onboardingContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <LanguageSelector language={language} handleLanguageChange={handleLanguageChange} />
      {loading ? (
        <div className="loader-container">
          <div className="loader-medium"></div>
        </div>
      ) : (
        <>
          {step === 1 && (
            <UserInfoStep
              userUid={userUid}
              userData={userData}
              handleChange={handleChange}
              handleNext={handleNext}
              navigate={navigate}
              t={t}
            />
          )}
          {step === 2 && (
            <PhysicalInfoStep
              userData={userData}
              handleChange={handleChange}
              handleNext={handleNext}
              handleBack={handleBack}
              t={t}
            />
          )}
          {step === 3 && (
            <ActivityGoalStep
              userData={userData}
              handleActivityLevelChange={handleActivityLevelChange}
              handleGoalChange={handleGoalChange}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              t={t}
            />
          )}
          <StepIndicator currentStep={step} />
        </>
      )}
    </div>
  );
};

export default Onboarding;