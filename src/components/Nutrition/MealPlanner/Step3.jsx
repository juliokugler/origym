import React, { useState } from "react";
import styles from "./Step3.module.css";
import { FaEdit } from "react-icons/fa";
import StepIndicator from "../../StepIndicator/StepIndicator";
import DaySelector from "../../DaySelector/DaySelector"
import createImage from "./createRecipe.png"

const Step3 = ({ onNext, onPrevious, ingredients, dayFromCard, mealFromCard }) => {
  const [recipeName, setRecipeName] = useState("");

  const handleNextClick = () => {
    const mealInfo = {
      recipeName,
      ingredients,
    };
    onNext(mealInfo);
  };

  return (
    <div className={styles.container}>
      <h2>Recipe Details</h2>
      <StepIndicator currentStep={3} />
      <div className={styles.nameContainer}>
      <div className={styles.imageContainer}>
        <img src={createImage} alt="Recipe" className={styles.recipeImage} />
        <FaEdit className={styles.editIcon} />
      </div>
      <label className={styles.label}>
        Recipe Name:
        <input
          type="text"
          placeholder="Add a name to your recipe"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </label></div>
      <div>
      <label className={styles.label}>
          Assign Meal Type:
          <select defaultValue={mealFromCard}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
            <option value="Supplementation">Supplementation</option>
          </select>
        </label>
      </div>
      <div className={styles.label}>
        Assign Days of the Week:
        <DaySelector/>
      </div>
      <div className={styles.buttonContainer}>
        <button className="notSelectedButton-medium" onClick={onPrevious}>Back</button>
        <button className="button" onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Step3;