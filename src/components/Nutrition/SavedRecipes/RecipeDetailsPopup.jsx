import React from "react";
import styles from "./SavedRecipes.module.css";

const ViewRecipe = ({ recipe, onClose }) => {
  console.log(recipe);
  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <div className={styles.titleAndButton}>
          <h3>{recipe.title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.content}>
          <img className={styles.popupImage} src={recipe.image}></img>
          <div className={styles.popupTitle}>
            <span>({recipe.totalCalories} calories per serving)</span>
          </div>{" "}
          <div className={styles.preparation}>{recipe.description}</div>
          <div className={styles.buttons}>
            <button>Share</button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
