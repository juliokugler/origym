import React, { useState } from "react";
import StepIndicator from "../../StepIndicator/StepIndicator";
import styles from "./Step1.module.css";
import searchImage from "./searchRecipe.png";
import createImage from "./createRecipe.png";

const Step1 = ({ onNext }) => {
  const [hovered, setHovered] = useState(null);

  const handleSelect = (type) => {
    onNext(type);
  };

  const handleMouseEnter = (type) => {
    setHovered(type);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className={styles.container}>
      <h2>Select Meal Type</h2>
      <StepIndicator currentStep={1} />
      <div className={styles.options}>
        <div
          className={styles.option}
          onClick={() => handleSelect("search")}
          onMouseEnter={() => handleMouseEnter("search")}
          onMouseLeave={handleMouseLeave}
        >
          <h3>Search Recipes</h3>
          <img
            src={searchImage}
            alt="Search Recipes"
            className={styles.image}
          />
        </div>
        <div
          className={styles.option}
          onClick={() => handleSelect("create")}
          onMouseEnter={() => handleMouseEnter("create")}
          onMouseLeave={handleMouseLeave}
        >
          <h3>Create Recipe</h3>
          <img
            src={createImage}
            alt="Create Recipe"
            className={styles.image}
          />
        </div>
      </div>
      {hovered === "search" && (
        <p className={styles.hoverText}>
          Select your own ingredients and create your own recipe. We also provide calorie information about your selections.
        </p>
      )}
      {hovered === "create" && (
        <p className={styles.hoverText}>
          Select your meal from a wide range of recipes made by our food experts at ORIGYM.
        </p>
      )}
    </div>
  );
};

export default Step1;