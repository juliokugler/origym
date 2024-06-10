//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./Favorites.module.css";

//Icons
import { FaStar } from "react-icons/fa";

//Translation Hook
import { useTranslation } from "react-i18next";

//Custom Hooks
import useFetchFavorites from "../../../hooks/useFetchFavorites";
import useRemoveFavorites from "../../../hooks/useRemoveFavorites";
import { useAuthValue } from "../../../contexts/AuthContext";

//Components
import AddFavorites from "./AddFavorites";

const Favorites = ({ favoriteChange }) => {
  const { user } = useAuthValue();
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(null);

  // Fetch favorites using the custom hook
  const { groups, toggleGroup, showAddExercise, setShowAddExercise } =
    useFetchFavorites(favoriteChange);

  // Remove favorite using the custom hook
  const { removeFavorite } = useRemoveFavorites();

  const handleFavoriteToggle = (groupId, exerciseId) => {
    removeFavorite(groupId, exerciseId).then(() => {});
  };

  const handleGroupSelection = (groupName) => {
    setActiveGroup(groupName === activeGroup ? null : groupName);
    setShowAddExercise(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
      <div className={styles.groupButtons}>
        {Object.keys(groups).map((groupName) => (
          <button
            key={groupName}
            className={`${styles.groupButton} ${
              activeGroup === groupName ? "button-small" : "notSelectedButton-small"
            }`}
            onClick={() => handleGroupSelection(groupName)}
          >
            {groupName}
          </button>
        ))}
      </div>
      {Object.entries(groups).map(([groupName, groupExercises]) => (
        <div
          key={groupName}
          className={
            activeGroup === groupName ? styles.activeGroup : styles.hiddenGroup
          }
        >
          {activeGroup === groupName && (
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>{t("exercise")}</th>
                  <th>{t("reps")}</th>
                  <th>{t("weight")}</th>
                  <th>{t("oneRM")}</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {groupExercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>
                      <FaStar
                        color={"#FFF27A"}
                        size={18}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleFavoriteToggle(groupName, exercise.id)
                        }
                      />
                      {exercise.name}
                    </td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.maxWeight}kgs</td>
                    <td>{exercise.oneRepMax}kgs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}</div>

      {showAddExercise && (
        <AddFavorites
          onClose={() => setShowAddExercise(false)}
          activeGroup={activeGroup}
        />
      )}

      {!showAddExercise && (
        <div className={styles.buttonContainer}>
        <button
          className="notSelectedButton-medium"
          onClick={() => setShowAddExercise(true)}
        >
          <p>{t("addExercise")}</p>
        </button></div>
      )}
    </div>
  );
};

export default Favorites;
