//React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./Header.module.css";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";

//Media
import bell from "../../assets/Icons/Bell.png";
import lupa from "../../assets/Icons/MagnifyingGlass.png";

const Header = ({ pageType, currentDate, timedGreeting, t }) => {
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
          <p>{currentDate}</p>
          <h2>
            {timedGreeting}, {user.displayName}
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
    default:
      greetingContent = null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.greetingContainer}>
        <div className={styles.greeting}>{greetingContent}</div>
        <div className={styles.searchAndIcons}>
          <div className={styles.searchBar}>
            <img src={lupa} alt="magnifying glass"></img>
            <input placeholder={`${t("search")}...`} />
          </div>
          <div className={styles.notification}>
            <img src={bell} alt="Notification Bell" />
          </div>
          <div className={styles.avatar}>
            <img onClick={() => navigate("/profile")} src={user.photoURL}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
