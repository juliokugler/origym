import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Firebase
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";

//Styles
import styles from "./SettingsPage.module.css";
import { FaEdit } from "react-icons/fa";
import useFetchUserData from "../../hooks/useFetchUserData";

//Components
import Header from "../../components/Header/Header";

//Hooks

const SettingsPage = ({ switchLanguage, t }) => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const userData = useFetchUserData();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
  };
  // useEffect to handle the loading state
  useEffect(() => {
    if (userData) {
      console.log(userData);
      setLoading(false); // Set loading to false when userData is available
    }
  }, [userData]);

  // Render loading state if userData is not available yet
  if (loading) {
    return <div>{t("loading")}...</div>;
  }

  // Render the Settings component when userData is available
  return (
    <div className={styles.container}>
      <Header t={t} pageType="settings" />
      {userData.userProfileData && userData.userProfileData.firstName && (
        <div className={styles.mainSection}>
          {" "}
          <div className={styles.card}>
            <img
              className={styles.avatar}
              src={userData.userProfileData.photoURL}
              alt="User avatar"
            ></img>
            <div className={styles.mainUserData}>
              <h3>{userData.userProfileData.displayName}</h3>
              <h3>@{userData.userProfileData.displayName}</h3>

              <p>
                {t("age")}: {userData.userProfile.age}
              </p>
              <p>
                {t("height")}: {userData.userProfile.height}cm
              </p>
              <p>
                {t("weight")}: {userData.userProfile.currentWeight}Kgs
              </p>
            </div>
            <div className={styles.mainUserData}>
              <p>
                {t("mainGoal")}: {userData.userProfile.mainGoal}
              </p>
              <p>
                {t("activityLevel")}: {userData.userProfile.activityLevel}
              </p>{" "}
              <div className={styles.buttonColumn}>
                <FaEdit />
              </div>
            </div>

            <label htmlFor="language">Select Language:</label>
            <select id="language" onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
