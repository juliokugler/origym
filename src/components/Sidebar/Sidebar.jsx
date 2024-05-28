//React
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

//Styles
import styles from "./Sidebar.module.css";

//Icons
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/Icons/Logo.png";
import Home from "../../assets/Icons/Home_Icon.png";
import Home_active from "../../assets/Icons/Home_Icon_Active.png";
import Workouts from "../../assets/Icons/Workouts_Icon.png";
import Workouts_active from "../../assets/Icons/Workouts_Icon_Active.png";
import Nutrition from "../../assets/Icons/Nutrition_Icon.png";
import Nutrition_active from "../../assets/Icons/Nutrition_Icon_Active.png";
import Health from "../../assets/Icons/Health_Icon.png";
import Health_active from "../../assets/Icons/Health_Icon_Active.png";
import Friends from "../../assets/Icons/Friends_Icon.png";
import Friends_active from "../../assets/Icons/Friends_Icon_Active.png";
import Settings from "../../assets/Icons/Gear_Icon.png";
import SignOut from "../../assets/Icons/SignOut_Icon.png";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  // Function to set active page based on current location
  const setActive = () => {
    const path = location.pathname;
    if (path === "/home") {
      setActivePage("home");
    } else if (path === "/workouts") {
      setActivePage("workouts");
    } else if (path === "/nutrition") {
      setActivePage("nutrition");
    } else if (path === "/health") {
      setActivePage("health");
    } else if (path === "/friends") {
      setActivePage("friends");
    } else {
      setActivePage("");
    }
  };

  // Call setActive initially and on location change
  useEffect(() => {
    setActive();
  }, [location]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo"></img>
      </div>
      <ul className={styles.sidebarMenu}>
        <li>
          <NavLink
            to="/home"
            className={activePage === "home" ? styles.activeLink : styles.link}
          >
            <img
              src={activePage === "home" ? Home_active : Home}
              className={styles.icon}
              alt="Home Icon"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/workouts"
            className={
              activePage === "workouts" ? styles.activeLink : styles.link
            }
          >
            <img
              src={activePage === "workouts" ? Workouts_active : Workouts}
              className={styles.icon}
              alt="Workouts Icon"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nutrition"
            className={
              activePage === "nutrition" ? styles.activeLink : styles.link
            }
          >
            <img
              src={activePage === "nutrition" ? Nutrition_active : Nutrition}
              className={styles.icon}
              alt="Nutrition Icon"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/health"
            className={
              activePage === "health" ? styles.activeLink : styles.link
            }
          >
            <img
              src={activePage === "health" ? Health_active : Health}
              className={styles.icon}
              alt="Health Icon"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className={
              activePage === "friends" ? styles.activeLink : styles.link
            }
          >
            <img
              src={activePage === "friends" ? Friends_active : Friends}
              className={styles.icon}
              alt="Friends Icon"
            ></img>
          </NavLink>
        </li>
      </ul>
      <ul className={styles.secondSidebarMenu}>
        <li>
          <NavLink
            to="/settings"
            className={
              activePage === "settings" ? styles.activeLink : styles.link
            }
          >
            <img
              src={activePage === "settings" ? Settings : Settings}
              className={styles.icon}
              alt="Settings Icon"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={styles.link}>
            <img src={SignOut} onClick={logout} className={styles.icon} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
