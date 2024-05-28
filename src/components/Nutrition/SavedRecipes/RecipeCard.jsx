import React, { useState } from "react";
import styles from "./SavedRecipes.module.css"; // Import the CSS for RecipeCard
import ViewRecipe from "./RecipeDetailsPopup";

const RecipeCard = ({ recipe, image }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.recipeCard}>
      <img src={image} alt={recipe.title} className={styles.recipeImage} />
      <div className={styles.recipeInfo}>
        <h4 className={styles.recipeTitle}>{recipe.title}</h4>
      </div>

      {showPopup && <ViewRecipe recipe={recipe} onClose={handleClosePopup} />}
    </div>
  );
};

export default RecipeCard;
