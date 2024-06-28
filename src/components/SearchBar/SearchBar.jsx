import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import useFetchUsers from "../../hooks/useFetchUsers";
import lupa from "../../assets/Icons/MagnifyingGlass.png";
import classNames from "classnames";

const SearchBar = ({ t, userData, userInfo, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUsername, setCurrentUsername] = useState(userData.userProfile.displayNameLower);
  const [isFocused, setIsFocused] = useState(false);
  const { users, loading, error } = useFetchUsers(searchTerm, currentUsername);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (uid) => {
    navigate(`/profile/${uid}`);
  };

  const handleOutsideClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchTerm("");
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={ !isMobile ? styles.searchBar : styles.searchBar_mobile} ref={searchRef}>
      <img className={classNames(styles.searchBarImage, { [styles.hidden]: isMobile && (isFocused || searchTerm.length > 0) })} src={lupa} alt="magnifying glass" />
      <input
        placeholder={isMobile ? "" : `${t("search")}...`}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm.trim().length >= 3 && (
        <div className={classNames(styles.searchResults, styles.card)}>
          {loading && <p>{t("loading")}...</p>}
          {error && <p>Error: {error.message}</p>}
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.uid}
                className={styles.searchResultItem}
                onClick={() => handleUserClick(user.uid)}
              >
                <img
                  src={user.newPhotoURL ? user.newPhotoURL : user.photoURL}
                  alt={user.displayName}
                  className={styles.searchResultImage}
                />
                <p>@{user.displayName}</p>
              </div>
            ))
          ) : (
            <p>{t("noResults")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;