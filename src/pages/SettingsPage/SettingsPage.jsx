import React, { useState, useEffect } from "react";

//Styles
import styles from "./SettingsPage.module.css";
import classNames from "classnames"

//Icons
import { FaEdit } from "react-icons/fa";
import flagPt from "../../assets/Icons/flag_pt.png";
import flagEn from "../../assets/Icons/flag_en.png";
import flagEs from "../../assets/Icons/flag_es.png";
import flagFr from "../../assets/Icons/flag_fr.png";
import flagIt from "../../assets/Icons/flag_it.png";
import flagDe from "../../assets/Icons/flag_de.png";

//Components
import Header from "../../components/Header/Header";
import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";

//Hooks

const SettingsPage = ({ switchLanguage, t, userData }) => {
  const [loading, setLoading] = useState(true); // Initialize loading state
const [language, setLanguage] = useState("pt");

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
    setLanguage(selectedLanguage)
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
    return <div className="loader-container"><div className="loader"/></div>;
  }

  // Render the Settings component when userData is available
  return (
    <div className={styles.container}>
      <Header userData={userData} t={t} pageType="settings" />
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
            <div className={styles.languageContainer}>
 <div className={styles.flagContainer}>
    {(() => {
      switch (language) {
        case "pt":
          return <img src={flagPt} alt="Portuguese Flag" />;
        case "en":
          return <img src={flagEn} alt="English Flag" />;
        case "es":
          return <img src={flagEs} alt="Spanish Flag" />;
        case "fr":
          return <img src={flagFr} alt="French Flag" />;
        case "de":
          return <img src={flagDe} alt="German Flag" />;
        case "it":
          return <img src={flagIt} alt="Italian Flag" />;
        default:
          return null;
      }
    })()}
  </div>
  <div className={classNames("card", styles.languageDropdown)}>
    <select id="language" onChange={handleLanguageChange}>
      <option value="pt">{t("portuguese")}</option>
      <option value="en">{t("english")}</option>
      <option value="es">{t("spanish")}</option>
      <option value="fr">{t("french")}</option>
      <option value="de">{t("german")}</option>
      <option value="it">{t("italian")}</option>
    </select>
  </div>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
