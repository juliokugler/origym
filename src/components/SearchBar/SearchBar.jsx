import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import useFetchUsers from "../../hooks/useFetchUsers";
import lupa from "../../assets/Icons/MagnifyingGlass.png";
import classNames from "classnames"

const SearchBar = ({ t, userData, userInfo, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUsername, setCurrentUsername] = useState(userData.userProfile.displayNameLower);
  const { users, loading, error } = useFetchUsers(searchTerm, currentUsername);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (uid) => {
    navigate(`/profile/${uid}`);
  };

 
  return (
    <div className={ !isMobile? styles.searchBar : styles.searchBar_mobile}>
      <img className={styles.searchBarImage} src={lupa} alt="magnifying glass" />
      <input
        placeholder={`${t("search")}...`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm.length >= 3 && (
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