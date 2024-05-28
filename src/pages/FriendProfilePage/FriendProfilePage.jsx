import React from "react";
import { useAuthValue } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./FriendProfilePage.module.css";
import Header from "../../components/Header/Header";
import ChangePhotoURL from "../../components/Profile/ChangePhotoURL";
import { FaEdit } from "react-icons/fa";

const FriendProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuthValue();

  // Dummy user data for illustration
  const userData = {
    displayName: "John Doe",
    photoURL: "https://via.placeholder.com/150", // Placeholder image
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
        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={userData.photoURL}
              alt="User avatar"
            />
            <button className={styles.editButton} onClick={() => {}}>
              <FaEdit />
            </button>
          </div>
          <div className={styles.userInfo}>
            <h2>{userData.displayName}</h2>
            <p>
              {t("profile.age")}: {userData.age}
            </p>
            <p>
              {t("profile.height")}: {userData.height} cm
            </p>
            <p>
              {t("profile.weight")}: {userData.weight} kg
            </p>
            <p>
              {t("profile.activityLevel")}: {userData.activityLevel}
            </p>
            <p>
              {t("profile.gender")}: {userData.gender}
            </p>
            <p>
              {t("profile.weightGoal")}: {userData.weightGoal}
            </p>
            <p>
              {t("profile.TDEE")}: {userData.TDEE}
            </p>
            <p>
              {t("profile.waterIntake")}: {userData.waterIntake}
            </p>
            <p>
              {t("profile.proteinIntake")}: {userData.proteinIntake}
            </p>
            <p>
              {t("profile.carbsIntake")}: {userData.carbsIntake}
            </p>
            <p>
              {t("profile.fatIntake")}: {userData.fatIntake}
            </p>
            <p>
              {t("profile.mainGoal")}: {userData.mainGoal}
            </p>
          </div>
        </div>
        <ChangePhotoURL />
      </div>
    </div>
  );
};

export default FriendProfilePage;
