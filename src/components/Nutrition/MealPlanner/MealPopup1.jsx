import React, { useState } from "react";
import styles from "./MealPopup.module.css";

const MealPopup1 = ({ onNext }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const meals = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"];
  const [partner, setPartner] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage to 1
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [name, setName] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [quantityTypeInput, setQuantityTypeInput] = useState("grams");
  const [ingredientList, setIngredientList] = useState([]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const index = prevSelectedDays.indexOf(day);
      if (index === -1) {
        return [...prevSelectedDays, day]; // Add day to the list if not already selected
      } else {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day); // Remove day from the list if already selected
      }
    });
  };

  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value); // Update ingredient input state with the new value
  };

  const handleQuantityChange = (e) => {
    setQuantityInput(e.target.value); // Update quantity input state with the new value
  };

  const handleQuantityTypeChange = (e) => {
    setQuantityTypeInput(e.target.value); // Update quantity type input state with the new value
  };

  const handleAddToIngredientList = (
    ingredientInput,
    quantityInput,
    quantityTypeInput
  ) => {
    if (ingredientInput && quantityInput) {
      const newIngredient = {
        name: ingredientInput,
        quantity: quantityInput,
        quantityType: quantityTypeInput,
      };
      setIngredientList([...ingredientList, newIngredient]);
      setIngredientInput("");
      setQuantityInput("");
      setQuantityTypeInput("grams");
    }
  };

  const handleNextClick = () => {
    if (ingredientList.length > 0) {
      onNext(ingredientList);
    } else {
      alert("Please add at least one ingredient.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Meal Planner</h2>
      <div className={styles.options}></div>
      <div className={styles.ingredientOption}>
        <label>
          <p>Add Ingredient</p>
          <input
            className={styles.mealInput}
            value={ingredientInput}
            onChange={handleIngredientChange}
            type="text"
          ></input>
          <div>
            <p>Add Quantity</p>
            <input
              className={styles.quantityInput}
              value={quantityInput}
              onChange={handleQuantityChange}
              type="number"
              min="0"
            ></input>
            <select
              className={styles.quantityTypeInput}
              value={quantityTypeInput}
              onChange={handleQuantityTypeChange}
            >
              <option value="portion">
                Portion{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="grams">
                Gram{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="ounces">
                Ounce{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="pounds">
                Pound{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="milliliters">
                Milliliter{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="liters">
                Liter{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="spoons">
                Spoon{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="tablespoons">
                Tablespoon{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="teaspoons">
                Teaspoon{quantityInput === "1" ? "" : "s"}
              </option>
              <option value="cups">
                Cup{quantityInput === "1" ? "" : "s"}
              </option>
            </select>
          </div>
          {ingredientInput !== "" && quantityInput !== "" && (
            <button
              onClick={() =>
                handleAddToIngredientList(
                  ingredientInput,
                  quantityInput,
                  quantityTypeInput
                )
              }
            >
              Add
            </button>
          )}
        </label>
        <div className={styles.ingredientList}>
          {ingredientList.length > 0 && (
            <ul>
              {ingredientList.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.quantityType} of{" "}
                  {ingredient.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h4>or</h4>
      <div>
        <div className={styles.option}>
          <label>
            <p>Search Recipes</p>
            <input className={styles.mealInput} type="text"></input>
          </label>
        </div>
        <h4>Total Calories:</h4>
      </div>
      <div className={styles.Buttons}>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default MealPopup1;
