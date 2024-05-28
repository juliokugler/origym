//React
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

//Styles
import styles from "./Navbar.module.css";

//Translation Hook
import { useTranslation } from "react-i18next";

//Custom Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/AuthContext";

//Icons
import logo from "./logo.png";

const Navbar = ({ switchLanguage }) => {
  const [buttonClass, setButtonClass] = useState(styles.clickableButton);
  const location = useLocation();
  const { t } = useTranslation();
  const { logout } = useAuthentication();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const isCurrentRoute = (route) => location.pathname.startsWith(route);
  const { user } = useAuthValue();

  const handleClick = () => {
    setButtonClass(styles.clickedButton);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout("/login"); // Call the logout function with the redirect path
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prevState) => !prevState);
  };

  const handleLanguageChange = (lng) => {
    switchLanguage(lng);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.imgContainer}>
        <NavLink to="/" className={styles.logo} onClick={handleClick}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Language Dropdown Menu 

      <select onChange={(e) => handleLanguageChange(e.target.value)}>
        <option className={styles.languageOption} value="en">
          Inglês
        </option>
        <option value="pt">Português</option>
      </select>*/}

      <ul className={styles.links_list}>
        {/* Feed */}
        {user && (
          <li>
            <NavLink to="/home">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/home") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>Home</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Workouts Page */}

        {user && (
          <li>
            <NavLink to="/workouts">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/workouts") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>{t("workouts")}</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Nutrition Page */}

        {user && (
          <li>
            <NavLink to="/nutrition">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/nutrition") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>{t("nutrition")}</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Health Page */}

        {user && (
          <li>
            <NavLink to="/health">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/health") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>{t("health")}</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* About */}

        <li>
          <NavLink to="/about">
            <div
              className={`${styles.navContainer} ${
                isCurrentRoute("/about") ? styles.active : ""
              }`}
            >
              <p className={styles.navTitle}>{t("about")}</p>
            </div>
          </NavLink>
        </li>

        {/* Register */}

        {!user && (
          <li>
            <NavLink to="/register">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/register") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>{t("signup")}</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Login */}

        {!user && (
          <li>
            <NavLink to="/login">
              <div
                className={`${styles.navContainer} ${
                  isCurrentRoute("/login") ? styles.active : ""
                }`}
              >
                <p className={styles.navTitle}>{t("login")}</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Logout Button */}

        {user && (
          <li>
            <NavLink to="/home">
              <div onClick={handleLogout} className={styles.navContainer}>
                <p className={styles.logout}>{t("logout")}</p>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
