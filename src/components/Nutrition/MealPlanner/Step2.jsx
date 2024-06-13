import React, { useState, useRef, useEffect } from "react";
import styles from "./Step2.module.css";
import StepIndicator from "../../StepIndicator/StepIndicator";
import ingredientsTranslation from "../../../assets/Ingredients/Ingredients.json";

const Step2 = ({ onNext, onPrevious, mealType, t }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [quantityTypeInput, setQuantityTypeInput] = useState("grams");
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientname, setIngredientname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unidade, setUnidade] = useState("grams");
  const [calorias, setCalorias] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [nutritionalData, setNutritionalData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const NUTRITIONIX_API_KEY = process.env.REACT_APP_NUTRITIONIX_API_KEY;
  const NUTRITIONIX_APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID;

  useEffect(() => {
    if (ingredientname === "") {
      setQuantity("");
      setCalorias("");
    }
  }, [ingredientname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "ingredientname") {
      setIngredientname(value);
      updateSuggestions(value);
    } else if (name === "quantity") {
      setQuantity(value);
    }
  };

  const handleUnidadeChange = (event) => {
    setUnidade(event.target.value);
  };

  const handleAddToList = async () => {
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setCalorias("Undefined value");
      return;
    }

    try {
      const selectedLanguage = localStorage.getItem("i18nextLng") || "en";
      const ingredientName = translateIngredient(ingredientname, selectedLanguage);
      if (!ingredientName) {
        console.error(`Translation for ${ingredientname} not found in ${selectedLanguage}`);
        setCalorias("Translation not found");
        return;
      }

      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": NUTRITIONIX_APP_ID,
            "x-app-key": NUTRITIONIX_API_KEY,
          },
          body: JSON.stringify({
            query: `${quantity} ${unidade} ${ingredientName}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const food = data.foods[0];

      const newIngredient = {
        name: ingredientname,
        quantity,
        quantityType: unidade,
        calorias: food.nf_calories,
      };

      setIngredients([...ingredients, newIngredient]);
      setTotalCalories((prevTotal) => prevTotal + food.nf_calories);

      setIngredientname("");
      setQuantity("");
      setUnidade("grams");
      setCalorias("");

      const highresPhoto = food.photo?.highres || "";
      setIngredientImage(highresPhoto);

      console.log("Highres Photo:", highresPhoto);
      console.log("Full Photo Data:", food.photo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const translateIngredient = (ingredient, language) => {
    const normalizedIngredient = ingredient.toLowerCase().trim();
    const ingredientObject = ingredientsTranslation.find(item => item.translations[language]?.toLowerCase() === normalizedIngredient);
    return ingredientObject ? ingredientObject.name : null;
  };

  const updateSuggestions = (input) => {
    const selectedLanguage = localStorage.getItem("i18nextLng") || "en";
    const normalizedInput = input.toLowerCase().trim();
    const filteredSuggestions = ingredientsTranslation.filter(item => item.translations[selectedLanguage]?.toLowerCase().includes(normalizedInput));
    setSuggestions(filteredSuggestions.map(item => item.translations[selectedLanguage]));
  };

  const handleSuggestionClick = (suggestion) => {
    setIngredientname(suggestion);
    setSuggestions([]);
  };

  const handleNextClick = () => {
    onNext({ ingredients, totalCalories });
  };

  return (
    <div className={styles.container}>
      <h2>{mealType === "create" ? t("addMeal") : t("addRecipe")}</h2>
      <StepIndicator currentStep={2} />
      {mealType === "create" ? (
        <div className={styles.labels}>
          <label className={styles.label} htmlFor="ingredientname">
           <p>{t("ingredient")}:</p> 
          </label>
          <input
            type="text"
            id="ingredientname"
            name="ingredientname"
            value={ingredientname}
            onChange={handleChange}
            className={styles.ingredientInput}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions} ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.quantityLabels}>
            <div>
            <label className={styles.quantityLabel} htmlFor="quantity">
              <p>{t("quantity")}:</p>
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              className={styles.quantityInput}
            /></div>
            <select
              className={styles.quantityTypeInput}
              value={unidade}
              onChange={handleUnidadeChange}
            >
              <option value="grams">{t("grams")}</option>
              <option value="unities">{t("portions")}</option>
              <option value="ml">{t("mililiters")}</option>
              <option value="ounces">{t("ounces")}</option>
            </select><div>
          </div></div>
          <button className="button" onClick={handleAddToList}>{t("addToList")}</button>

          <label className={styles.label}>
          <p>{t("ingredientList")}:</p> 
            <div className={styles.list}>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity} {ingredient.quantityType} {t("of")} {ingredient.name} - {ingredient.calorias} {t("calories")}
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className={styles.label}>
          <p>{t("totalCalories")}:</p>  </label>
          <input className={styles.ingredientInput} type="text" value={totalCalories} readOnly/>
         
        </div>
      ) : (
        <div>
          <label className={styles.label}>
          <p>{t("searchRecipes")}:</p>
            <input type="text" />
          </label>
          <label className={styles.label}>
          <p>{t("ingredientList")}:</p>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.quantityType} of {ingredient.name} - {ingredient.calorias} {t("calories")}
                </li>
              ))}
            </ul>
          </label>
          <label className={styles.label}>
          <p>{t("totalCalories")}:</p>  </label>
            <input className={styles.caloriesResultInput} type="text" value={totalCalories} readOnly/>
         
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className="notSelectedButton-medium" onClick={onPrevious}>{t("back")}</button>
        <button className="button" onClick={handleNextClick}>{t("next")}</button>
      </div>
    </div>
  );
};

export default Step2;