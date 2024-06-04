import React, { useState, useEffect } from "react";

//Styles
import styles from "./SettingsPage.module.css";
import { FaEdit } from "react-icons/fa";

//Components
import Header from "../../components/Header/Header";
import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";

//Hooks

const SettingsPage = ({ switchLanguage, t, userData }) => {
  const [loading, setLoading] = useState(true); // Initialize loading state


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
      {userData.userProfile && userData.userProfile.firstName && (
        <div className={styles.mainSection}>
          {" "}
          <div className={styles.card}>
            <img
              className={styles.avatar}
              src={userData.userProfile.photoURL}
              alt="User avatar"
            ></img>
            <div className={styles.mainUserData}>
              <h3>{userData.userProfile.displayName}</h3>
              <h3>@{userData.userProfile.displayName}</h3>

              <p>
                {t("age")}: {userData.userProfile.age}
              </p>
              <p>
                {t("height")}: {userData.userProfile.height}cm
              </p>
              <p>
                {t("weight")}: {userData.userProfile.currentWeight}Kgs
              </p>
              <ChangePhotoURL/>
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
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>

            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
