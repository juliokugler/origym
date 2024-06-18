import React, { useState, useRef, useEffect } from "react";
import styles from "./Step2.module.css";
import StepIndicator from "../../StepIndicator/StepIndicator";
import ingredientsTranslation from "../../../assets/Ingredients/Ingredients.json";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const Step2 = ({ onNext, onPrevious, mealType, t }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [quantityTypeInput, setQuantityTypeInput] = useState("grams");
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientname, setIngredientname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("grams");
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [nutritionalData, setNutritionalData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [mealSuggestions, setMealSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const NUTRITIONIX_API_KEY = process.env.REACT_APP_NUTRITIONIX_API_KEY;
  const NUTRITIONIX_APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID;
  const selectedLanguage = localStorage.getItem("i18nextLng") || "en";
  const [recipeIngredients, setRecipeIngredients] = useState([])


  const fetchMealSuggestions = async (searchTerm, selectedLanguage) => {
    const db = getFirestore();
    const mealCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Supplementation", "Desserts"];
    const allSuggestions = [];

    for (const category of mealCategories) {
      const mealsRef = collection(db, "mealSuggestions", category, "meals");
      const q = query(mealsRef, where(`title.${selectedLanguage}`, ">=", searchTerm), where(`title.${selectedLanguage}`, "<=", searchTerm + "\uf8ff"));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty && selectedLanguage !== "en") {
        const fallbackQuery = query(mealsRef, where("title.en", ">=", searchTerm), where("title.en", "<=", searchTerm + "\uf8ff"));
        const fallbackSnapshot = await getDocs(fallbackQuery);
        fallbackSnapshot.docs.forEach(fallbackDoc => allSuggestions.push(fallbackDoc.data()));
      } else {
        querySnapshot.docs.forEach(suggestionDoc => allSuggestions.push(suggestionDoc.data()));
      }
    }
    return allSuggestions;
  };

  useEffect(() => {
    if (ingredientname === "") {
      setQuantity("");
      setCalories("");
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

  const handleQuantityTypeChange = (event) => {
    setQuantityType(event.target.value);
  };

  const handleAddToList = async () => {
    console.log("Adding to list with quantity:", quantity, "quantity type:", quantityType);
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setCalories("Undefined value");
      return;
    }

    try {
      const ingredientName = translateIngredient(ingredientname, selectedLanguage);
      console.log("Translated ingredient name:", ingredientName);
      if (!ingredientName) {
        console.error(`Translation for ${ingredientname} not found in ${selectedLanguage}`);
        setCalories("Translation not found");
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
            query: `${quantity} ${quantityType} ${ingredientName}`,
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
        quantityType: quantityType,
        calories: food.nf_calories,
      };

      setIngredients([...ingredients, newIngredient]);
      setTotalCalories((prevTotal) => prevTotal + food.nf_calories);

      setIngredientname("");
      setQuantity("");
      setQuantityType("grams");
      setCalories("");

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
    console.log(`Filtered ${filteredSuggestions.length} suggestions for input "${input}"`);
    setSuggestions(filteredSuggestions.map(item => item.translations[selectedLanguage]));
  };

  const handleSuggestionClick = (suggestion, type = "ingredient") => {
    if (type === "ingredient") {
      setIngredientname(suggestion);
      setSuggestions([]);
    } else if (type === "meal") {
      const selectedMeal = mealSuggestions.find(meal => meal.title[selectedLanguage] === suggestion || meal.title.en === suggestion);
      if (selectedMeal) {
        const mealIngredients = selectedMeal.ingredients.map(ingredient => ({
          name: ingredients.pt || ingredients.en,
    
        }));
        setIngredients([...ingredients, ...mealIngredients]);
        const newTotalCalories = mealIngredients.reduce((total, ing) => total + ing.calories, totalCalories);
        setTotalCalories(newTotalCalories);
        setMealSuggestions([]);
        setIngredientInput("");
      }
    }
  };

  const handleNextClick = () => {
    onNext({ ingredients, totalCalories });
  };

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setIngredientInput(searchTerm);
    if (searchTerm.length > 2) {
      const suggestions = await fetchMealSuggestions(searchTerm, selectedLanguage);
      console.log("Fetched meal suggestions:", suggestions);
      setMealSuggestions(suggestions);
    } else {
      setMealSuggestions([]);
    }
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
                <li key={index} onClick={() => handleSuggestionClick(suggestion, "ingredient")}>
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
              />
            </div>
            <select
              className={styles.quantityTypeInput}
              value={quantityType}
              onChange={handleQuantityTypeChange}
            >
              <option value="grams">{t("grams")}</option>
              <option value="unities">{t("portions")}</option>
              <option value="ml">{t("mililiters")}</option>
              <option value="ounces">{t("ounces")}</option>
            </select>
          </div>
          <button className="button" onClick={handleAddToList}>{t("addToList")}</button>
          <label className={styles.label}>
            <p>{t("ingredientList")}:</p>
            <div className={styles.list}>
              <ul className={styles.ingredientList}>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.quantity} {ingredient.quantityType} - {t("calories")}: {ingredient.calories}
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className={styles.label}>
            <p>{t("totalCalories")}: {totalCalories}</p>
          </label>
        </div>
      ) : (
        <div>
          <label className={styles.label} htmlFor="searchMeal">
            <p>{t("searchMeal")}:</p>
          </label>
          <input
            type="text"
            id="searchMeal"
            name="searchMeal"
            value={ingredientInput}
            onChange={handleSearchChange}
            className={styles.ingredientInput}
          />
          {mealSuggestions.length > 0 && (
            <ul className={styles.suggestions} ref={suggestionsRef}>
              {mealSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion.title[selectedLanguage] || suggestion.title.en, "meal")}>
                  {suggestion.title[selectedLanguage] || suggestion.title.en}
                </li>
              ))}
            </ul>
          )}
          <label className={styles.label}>
            <p>{t("ingredientList")}:</p>
            <div className={styles.list}>
              <ul className={styles.ingredientList}>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.quantity} {ingredient.quantityType} - {t("calories")}: {ingredient.calories}
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className={styles.label}>
            <p>{t("totalCalories")}: {totalCalories}</p>
          </label>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button className="button" onClick={onPrevious}>
          {t("previous")}
        </button>
        <button className="button" onClick={handleNextClick}>
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default Step2;