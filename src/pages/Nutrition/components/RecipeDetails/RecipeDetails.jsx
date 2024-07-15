//React
import React from "react";

//Styles
import styles from "./RecipeDetails.module.css";

//Icons
import { FaTimes, FaShareAlt, FaSave } from "react-icons/fa";

const RecipeDetails = ({ language, recipe, onClose, t }) => {
  return (
    <div  className={styles.background} onClick={onClose}>  <button className={styles.closeButton} onClick={onClose}>
    <FaTimes className={styles.closeButton} />
  </button>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupContent}>
          <div className={styles.popupImageContainer}>
            <img
              className={styles.popupImage}
              src={recipe.image}
              alt={recipe.title[language]}
            />
          </div>
          <div className={styles.recipeDetails}>
            <div className={styles.titleAndButton}>
              <h3>{recipe.title[language]}</h3>
            
            </div>
            <div className={styles.description}>{recipe.description[language]}</div>
            {recipe.ingredients && recipe.ingredients[language] &&
              <div className={styles.section}>
                <h4>{t("ingredients")}</h4>
                <ul>
                  {recipe.ingredients[language].map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>}
            <div className={styles.section}>
              <h4>{t("preparation")}</h4>
              <ol>
                {recipe.preparation[language].map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <div className={styles.buttons}>
              <button className={styles.inactiveButton}><FaShareAlt /> {t("share")}</button>
              <button className={styles.activeButton}><FaSave /> {t("save")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;