//React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./RegisterPage.module.css";

//Components
import RegisterContainer from "../../components/Register/RegisterContainer";
import AdditionalInfoPage from "../AdditionalInfoPage/AdditionalInfoPage";
import Confirm from "../../components/Register/Confirm";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import usePageNavigation from "../../hooks/usePageNavigation";
import useBackgroundImage from "../../hooks/useBackgroundImage";

//Media
import backgroundImage from "../../assets/Images/background.png";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
  );

  const [gender, setGender] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const { currentPage, goToNextPage } = usePageNavigation();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [error, setError] = useState(null);
  const {
    createUser,
    error: authError,
    loading,
    createUserDataDocument,
  } = useAuthentication();
  const navigate = useNavigate();
  const backgroundImageUrl = useBackgroundImage();

  const handleFirstNext = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setShowAdditionalInfo(true);
    goToNextPage();

    try {
      await createUser({ firstName, lastName, email, password });
      await createUserDataDocument(); // Create default user data document
      navigate("/additionalinfo"); // Redirect to additionalinfo after successful creation
    } catch (error) {
      setError("Error creating user. Please try again.");
    }
  };
  const handleSecondNext = (
    age,
    height,
    weight,
    mainGoal,
    activityLevel,
    gender,
    photoURL
  ) => {
    setAge(age);
    setHeight(height);
    setWeight(weight);
    setActivityLevel(activityLevel);
    setMainGoal(mainGoal);
    setGender(gender);

    if (photoURL !== "") {
      setPhotoURL(photoURL);
    } else {
      setPhotoURL(
        "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
      );
    }

    goToNextPage();
  };
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.container}>
        {currentPage === 1 && <RegisterContainer onNext={handleFirstNext} />}
        {currentPage === 2 && <AdditionalInfoPage onNext={handleSecondNext} />}
        {currentPage === 3 && (
          <Confirm
            firstName={firstName}
            lastName={lastName}
            age={age}
            weight={weight}
            height={height}
            activityLevel={activityLevel}
            mainGoal={mainGoal}
            email={email}
            password={password}
            gender={gender}
            photoURL={photoURL}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
