import React, { useState } from "react";
import styles from "./Step2.module.css";
import StepIndicator from "../../StepIndicator/StepIndicator";

const Step2 = ({ onNext, onPrevious, mealType }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [quantityTypeInput, setQuantityTypeInput] = useState("grams");

  const handleAddToList = () => {
    const newIngredient = {
      name: ingredientInput,
      quantity: quantityInput,
      quantityType: quantityTypeInput,
    };
    setIngredients([...ingredients, newIngredient]);
    setIngredientInput("");
    setQuantityInput("");
    setQuantityTypeInput("grams");
  };

  const handleNextClick = () => {
    onNext(ingredients);
  };

  return (
    <div className={styles.container}>
      <h2>{mealType === "create" ? "Add Meal" : "Add Recipe"}</h2>
      <StepIndicator currentStep={2} />
      {mealType === "create" ? (
        <div className={styles.labels}> 
         <label className={styles.label}>
            Add Ingredients:
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
          </label>
          <div className={styles.quantityLabels}>
          <label className={styles.quantityLabel}>
            Add Quantity:
            <input
              type="number"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
            />
          </label>
          
          <label className={styles.quantityTypeLabel}>
            Quantity Type:
            <select
              value={quantityTypeInput}
              onChange={(e) => setQuantityTypeInput(e.target.value)}
            >
              <option value="grams">Grams</option>
              <option value="milliliters">Milliliters</option>
              <option value="portions">Portions</option>
              <option value="cups">Cups</option>
            </select>
          </label></div>
          <button className="button" onClick={handleAddToList}>Add to List</button>
        
          <label className={styles.label}>
            Ingredient List:
            <div className={styles.list}>  <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.quantityType} of {ingredient.name}
              </li>
            ))}
          </ul></div>
          </label>
          <label className={styles.label}>
            Total Calories:
            <input type="text" />
          </label>
        </div>
      ) : (
        <div>
          <label className={styles.label}>
            Search Recipes:
            <input type="text" />
          </label>
          <label className={styles.label}>
            Ingredient List:
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.quantityType} of {ingredient.name}
                </li>
              ))}
            </ul>
          </label>
          <label className={styles.calorieLabel}>
            Total Calories:
            <input type="text" />
          </label>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className="notSelectedButton-medium" onClick={onPrevious}>Back</button>
        <button className="button" onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Step2;