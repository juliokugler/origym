import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import logo from "./logo.png";

const Navbar = ({user, t}) => {
  const [buttonClass, setButtonClass] = useState(styles.clickableButton);
  const location = useLocation();
  const { logout } = useAuthentication();
  const isCurrentRoute = (route) => location.pathname.startsWith(route);
  
  const handleClick = () => {
    setButtonClass(styles.clickedButton);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.imgContainer} hidden-mobile`}>
        <NavLink to="/" className={styles.logo} onClick={handleClick}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <ul className={styles.links_list}>
        {user && (
          <li>
            <NavLink to="/home">
              <div className={`${styles.navContainer} ${isCurrentRoute("/home") ? styles.active : ""}`}>
                <p className={styles.navTitle}>Home</p>
              </div>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/workouts">
              <div className={`${styles.navContainer} ${isCurrentRoute("/workouts") ? styles.active : ""}`}>
                <p className={styles.navTitle}>{t("workouts")}</p>
              </div>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/nutrition">
              <div className={`${styles.navContainer} ${isCurrentRoute("/nutrition") ? styles.active : ""}`}>
                <p className={styles.navTitle}>{t("nutrition")}</p>
              </div>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/health">
              <div className={`${styles.navContainer} ${isCurrentRoute("/health") ? styles.active : ""}`}>
                <p className={styles.navTitle}>{t("health")}</p>
              </div>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">
            <div className={`${styles.navContainer} ${isCurrentRoute("/about") ? styles.active : ""}`}>
              <p className={styles.navTitle}>{t("about")}</p>
            </div>
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/register">
              <div className={`${styles.navContainer} ${isCurrentRoute("/register") ? styles.active : ""}`}>
                <p className={styles.navTitle}>{t("signup")}</p>
              </div>
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/login">
              <div className={`${styles.navContainer} ${isCurrentRoute("/login") ? styles.active : ""}`}>
                <p className={styles.navTitle}>{t("login")}</p>
              </div>
            </NavLink>
          </li>
        )}
        
        {user && (
          <li className="hidden-mobile">
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
