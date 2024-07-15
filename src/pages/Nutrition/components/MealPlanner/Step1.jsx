//React
import React, { useState } from "react";

//Styles
import styles from "./Step1.module.css";

//Components
import StepIndicator from "../../../../components/StepIndicator/StepIndicator"

//Images
import searchImage from "../../../../assets/Images/searchRecipe.png";
import createImage from "../../../../assets/Images/createRecipe.png";

//Hooks
import useImageLoad from "../../../../hooks/useImageLoad";

const Step1 = ({ onNext, t }) => {
  const [hovered, setHovered] = useState(null);
  const searchImageLoaded = useImageLoad(searchImage);
  const createImageLoaded = useImageLoad(createImage);

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
      {!searchImageLoaded || !createImageLoaded ? (<div className={styles.loaderContainer}><div className="loader"></div></div>) : (
        <>
      <h2>{t("selectType")}</h2>
      <StepIndicator currentStep={1} />
      <div className={styles.options}>
        <div
          className={styles.option}
          onClick={() => handleSelect("search")}
          onMouseEnter={() => handleMouseEnter("search")}
          onMouseLeave={handleMouseLeave}
        >
          <h3>{t("searchRecipes")}</h3>
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
          <h3>{t("createRecipe")}</h3>
          <img
            src={createImage}
            alt="Create Recipe"
            className={styles.image}
          />
        </div>
      </div></>)}
      {hovered === "search" && (
        <p className={styles.hoverText}>
          
          {t("searchRecipesText")}
        </p>
      )}
      {hovered === "create" && (
        <p className={styles.hoverText}>
          {t("createRecipeText")}
        </p>
      )}
    </div>
  );
};

export default Step1;