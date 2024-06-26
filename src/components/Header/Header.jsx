import React from "react";
import styles from "./Header.module.css";
import { useAuthValue } from "../../contexts/AuthContext";
import bell from "../../assets/Icons/Bell.png";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
const Header = ({ pageType, currentDate, timedGreeting, t, userData, isMobile}) => {
  const { user } = useAuthValue();
  const navigate = useNavigate();

  let greetingContent = null;

  switch (pageType) {
    case "additionalInfo":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("settings")}</h2>
        </div>
      );
      break;
    case "settings":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("settings")}</h2>
        </div>
      );
      break;
    case "profile":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("profile")}</h2>
        </div>
      );
      break;
    case "nutrition":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("nutrition")}</h2>
        </div>
      );
      break;
    case "home":
      greetingContent = (
        <div className={styles.pageGreeting}>
          {!isMobile? (
          <p>{currentDate}</p>) : ("")}
          <h2>
            {timedGreeting}, {userData.userProfile.firstName}
          </h2>
        </div>
      );
      break;
    case "workouts":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("workouts")}</h2>
        </div>
      );
      break;
    case "health":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("health")}</h2>
        </div>
      );
      break;
    case "friends":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("friends")}</h2>
        </div>
      );
      break;
    default:
      greetingContent = null;
  }



  return (
    <> {
      !isMobile ? (<div className={styles.container}>
      <div className={styles.greetingContainer}>
        <div className={styles.greeting}>{greetingContent}</div>
        <div className={styles.searchAndIcons}>
          <SearchBar t={t} userData={userData}/>
          <div className={styles.notification}>
            <img src={bell} alt="Notification Bell" />
          </div>
          <div className={styles.avatar}>
            <img
              onClick={() => navigate("/profile")}
              src={user.photoURL}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </div>) : ( <div className={styles.container_mobile}>
      <div className={styles.greetingContainer_mobile}>
        <div className={styles.greeting}>{greetingContent}</div>
        <div className={styles.searchAndIcons_mobile}>
        <SearchBar isMobile={isMobile} t={t} userData={userData}/>
          <div className={styles.avatar_mobile}>
            <img
              onClick={() => navigate("/profile")}
              src={user.photoURL}
              alt="User Avatar"
            />
        </div>
        </div>
      </div>
    </div>) }</>
  );
};

export default Header;