import React, { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Confirm.module.css";
import ConfirmContainer from "./ConfirmContainer";
import EditContainer from "./EditContainer";
const Confirm = ({
  name,
  age,
  height,
  weight,
  mainGoal,
  activityLevel,
  password,
  email,
  gender,
  photoURL,
}) => {
  const [confirmedName, setConfirmedName] = useState(name);
  const [confirmedAge, setConfirmedAge] = useState(age);
  const [confirmedHeight, setConfirmedHeight] = useState(height);
  const [confirmedWeight, setConfirmedWeight] = useState(weight);
  const [confirmedMainGoal, setConfirmedMainGoal] = useState(mainGoal);
  const [confirmedActivityLevel, setConfirmedActivityLevel] =
    useState(activityLevel);
  const [confirmedEmail, setConfirmedEmail] = useState(email);
  const [confirmedGender, setConfirmedGender] = useState(gender);
  const [confirmedPhotoURL, setConfirmedPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
  );
  const [error, setError] = useState("");
  const [confirmedTDEE, setConfirmedTDEE] = useState("");
  const [confirmedWaterIntake, setConfirmedWaterIntake] = useState("");
  const [confirmedProteinIntake, setConfirmedProteinIntake] = useState("");
  const [confirmedCarbsIntake, setConfirmedCarbsIntake] = useState("");
  const [confirmedFatIntake, setConfirmedFatIntake] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async () => {
    const user = {
      confirmedName,
      confirmedEmail,
      password,
      confirmedAge,
      confirmedWeight,
      confirmedHeight,
      confirmedMainGoal,
      confirmedActivityLevel,
      confirmedPhotoURL,
      confirmedGender,
      confirmedTDEE,
      confirmedWaterIntake,
      confirmedProteinIntake,
      confirmedCarbsIntake,
      confirmedFatIntake,
    };

    try {
      // Attempt to create the user
      const userCredential = await createUser(user);
    } catch (error) {
      setError(error.message);
      console.error("Error creating user:", error);
    }
  };

  const handleChangeToEdit = () => {
    setShowEdit(true);
  };

  const handleChangeToConfirm = () => {
    setShowEdit(false);
  };

  const handleChange = (updatedData) => {
    // Update confirmed data with the updated data from EditContainer
    setConfirmedName(updatedData.name);
    setConfirmedAge(updatedData.age);
    setConfirmedHeight(updatedData.height);
    setConfirmedWeight(updatedData.weight);
    setConfirmedMainGoal(updatedData.mainGoal);
    setConfirmedActivityLevel(updatedData.activityLevel);
    setConfirmedEmail(updatedData.email);
    setConfirmedGender(updatedData.gender);
    setConfirmedPhotoURL(updatedData.photoURL);
  };

  const handleIntakeChange = (
    TDEE,
    waterIntake,
    proteinIntake,
    carbsIntake,
    fatIntake
  ) => {
    // Update confirmed data with the updated data from EditContainer
    setConfirmedTDEE(TDEE);
    setConfirmedWaterIntake(waterIntake);
    setConfirmedProteinIntake(proteinIntake);
    setConfirmedCarbsIntake(carbsIntake);
    setConfirmedFatIntake(fatIntake);
  };

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.registerContainer}>
          <h2>Review Your Information</h2>
          {!showEdit ? (
            <>
              <ConfirmContainer
                name={confirmedName}
                age={confirmedAge}
                height={confirmedHeight}
                weight={confirmedWeight}
                mainGoal={confirmedMainGoal}
                activityLevel={confirmedActivityLevel}
                email={confirmedEmail}
                gender={confirmedGender}
                photoURL={confirmedPhotoURL}
                onCorrect={handleIntakeChange}
              />
              <button onClick={handleChangeToEdit}>Update</button>
              <button onClick={handleSubmit}>Confirm and Submit</button>
            </>
          ) : (
            <>
              <EditContainer
                name={confirmedName}
                age={confirmedAge}
                height={confirmedHeight}
                weight={confirmedWeight}
                mainGoal={confirmedMainGoal}
                activityLevel={confirmedActivityLevel}
                email={confirmedEmail}
                gender={confirmedGender}
                photoURL={confirmedPhotoURL}
                onCorrect={handleChange}
              />
              <button onClick={handleChangeToConfirm}>Confirm</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
