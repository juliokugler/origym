import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useAuthValue } from "../../contexts/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import bell from "../../assets/Icons/Bell.png";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ pageType, currentDate, timedGreeting, t, userData, isMobile }) => {
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location
  const { logout } = useAuthentication();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const profileImageRef = useRef(null)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleOutsideClick = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target) && // Check if clicked outside the profileRef
      !profileImageRef.current.contains(event.target) // Check if clicked outside the profile image itself
    ) {
      setSearchActive(false); // Close search bar if clicked outside
    }
  
    // Close profile dropdown if clicked outside
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target) &&
      !profileImageRef.current.contains(event.target) // Check if clicked outside the profile image itself
    ) {
      setDropdownOpen(false);
    }
  };
  const handleScroll = () => {
    // Close profile dropdown on scroll
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll); // Remove scroll event listener on cleanup
    };
  }, []);

  const isCurrentRoute = (targetRoute) => {
    return location.pathname === targetRoute;
  };

  let greetingContent = null;

  switch (pageType) {
    case "additionalInfo":
      greetingContent = (
        <div className={styles.pageGreeting}>
          <h2>{t("additionalInfo")}</h2>
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
          {!isMobile ? (
            <>
              <p>{currentDate}</p>
              <h2>{timedGreeting}, {userData.userProfile.firstName}</h2>
            </>
          ) : (
            <h2>{timedGreeting}, <br /> {userData.userProfile.firstName}</h2>
          )}
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
    <>
      {!isMobile ? (
        <div className={styles.container}>
          <div className={styles.greetingContainer}>
            <div className={styles.greeting}>{greetingContent}</div>
            <div className={styles.searchAndIcons}>
              <SearchBar t={t} userData={userData} />
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
        </div>
      ) : (
        <div className={styles.container_mobile}>
          <div className={styles.greetingContainer_mobile}>
            <div className={styles.greeting}>{greetingContent}</div>
            <div className={styles.searchAndIcons_mobile}>
              <SearchBar
                isMobile={isMobile}
                t={t}
                userData={userData}
                searchActive={searchActive}
                onSearchClick={handleSearchClick}
                ref={searchRef}
              />
              <div className={styles.avatar_mobile} onClick={toggleDropdown} ref={profileRef}>
                <img ref={profileImageRef} src={user.photoURL} alt="User Avatar" />
              </div>
              {dropdownOpen && (
                <div className={styles.dropdownMenu} ref={profileRef}>
                  <ul>
                    <li onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className={isCurrentRoute("/profile") ? styles.currentRoute : ""}>{t("profile")}</li>
                    <li onClick={() => { navigate("/notifications"); setDropdownOpen(false); }} className={isCurrentRoute("/notifications") ? styles.currentRoute : ""}>{t("notifications")}</li>
                    <li onClick={() => { navigate("/settings"); setDropdownOpen(false); }} className={isCurrentRoute("/settings") ? styles.currentRoute : ""}>{t("settings")}</li>
                    <li onClick={handleLogout}>{t("logout")}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;