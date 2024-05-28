import React from "react";
import { useAuthValue } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./ProfilePage.module.css";
import Header from "../../components/Header/Header";
import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";
import { FaEdit, FaMedal, FaLink } from "react-icons/fa";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuthValue();

  // Dummy user data for illustration
  const userData = {
    displayName: "John Doe",
    photoURL: "https://via.placeholder.com/150",
    age: 30,
    height: 175,
    weight: 75,
    activityLevel: "Moderately Active",
    gender: "Male",
    weightGoal: "Lose Weight",
    TDEE: 2000,
    waterIntake: 2.0,
    proteinIntake: 110,
    carbsIntake: 250,
    fatIntake: 50,
    mainGoal: "Improve Health",
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={user.photoURL}
                alt="User avatar"
              />
              <button className={styles.editButton}>
                <FaEdit />
              </button>
            </div>
            <div className={styles.userInfo}>
              <h2>{userData.displayName}</h2>
              <p>@{userData.displayName}</p>
            </div>
          </div>
          <div className={styles.profileBody}>
            <div className={styles.infoSection}>
              <h3>{t("Personal Information")}</h3>
              <p>
                {t("ageLabel")}: {userData.age}
              </p>
              <p>
                {t("heightLabel")}: {userData.height} cm
              </p>
              <p>
                {t("weightLabel")}: {userData.weight} kg
              </p>
              <p>
                {t("activityLevelLabel")}: {t(userData.activityLevel)}
              </p>
              <p>
                {t("genderLabel")}: {t(userData.gender)}
              </p>
              <button className={styles.updateButton}>
                <FaEdit /> {t("Edit")}
              </button>
            </div>
            <div className={styles.infoSection}>
              <h3>{t("Health Goals")}</h3>
              <p>
                {t("weightGoal")}: {t(userData.weightGoal)}
              </p>
              <p>
                {t("mainGoal")}: {t(userData.mainGoal)}
              </p>
              <button className={styles.updateButton}>
                <FaEdit /> {t("Edit")}
              </button>
            </div>
            <div className={styles.infoSection}>
              <h3>{t("Nutritional Information")}</h3>
              <p>
                {t("TDEE")}: {userData.TDEE} kcal
              </p>
              <p>
                {t("waterIntake")}: {userData.waterIntake} L
              </p>
              <p>
                {t("proteinIntake")}: {userData.proteinIntake} g
              </p>
              <p>
                {t("carbsIntake")}: {userData.carbsIntake} g
              </p>
              <p>
                {t("fatIntake")}: {userData.fatIntake} g
              </p>
              <button className={styles.updateButton}>
                <FaEdit /> {t("Edit")}
              </button>
            </div>
            <div className={styles.infoSection}>
              <h3>{t("Achievements")}</h3>
              <p>
                <FaMedal /> {t("Completed 5K Run")}
              </p>
              <p>
                <FaMedal /> {t("Achieved Weight Goal")}
              </p>
              <button className={styles.updateButton}>
                <FaEdit /> {t("Add Achievement")}
              </button>
            </div>
            <div className={styles.infoSection}>
              <h3>{t("Social Media Links")}</h3>
              <p>
                <FaLink />{" "}
                <a
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </p>
              <p>
                <FaLink />{" "}
                <a
                  href="https://facebook.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
              <p>
                <FaLink />{" "}
                <a
                  href="https://instagram.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
              <button className={styles.updateButton}>
                <FaEdit /> {t("Edit Links")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
