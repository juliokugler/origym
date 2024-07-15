//React
import React, { useEffect, useState, useRef } from "react";

//Firebase
import { getFirestore, doc, setDoc } from "firebase/firestore";

//Styles
import styles from "./Calculator.module.css";

//Components
import NutritionalInfo from "../NutritionalInfo/NutritionalInfo";

//JSON
import ingredientsTranslation from "../../../../assets/Ingredients/Ingredients.json";

//Dependencies
import classNames from "classnames";


const Calculator = ({ t, userData, dailyInfo, user, onUserInfoChange, currentLanguage }) => {
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientname, setIngredientname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unidade, setUnidade] = useState("grams");
  const [calorias, setCalorias] = useState("");
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Current Language in handleSubmit:", currentLanguage);
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setCalorias("Valor indefinido");
      return;
    }
    try {
      const ingredientName = translateIngredient(ingredientname, currentLanguage);
      console.log("Translated Ingredient Name:", ingredientName);
      if (!ingredientName) {
        console.error(`Translation for ${ingredientname} not found in ${currentLanguage}`);
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

      setCalorias(food.nf_calories);
      setNutritionalData(food);

      const highresPhoto = food.photo?.highres || "";
      setIngredientImage(highresPhoto);

      console.log("Highres Photo:", highresPhoto);
      console.log("Full Photo Data:", food.photo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const translateIngredient = (ingredient, language) => {
    console.log("Current Language in translateIngredient:", language);
    const normalizedIngredient = ingredient.toLowerCase().trim();
    const ingredientObject = ingredientsTranslation.find(item => item.translations[language]?.toLowerCase() === normalizedIngredient);
    return ingredientObject ? ingredientObject.name : null;
  };

  const updateSuggestions = (input) => {
    console.log("Current Language in updateSuggestions:", currentLanguage);
    const normalizedInput = input.toLowerCase().trim();
    const filteredSuggestions = ingredientsTranslation.filter(item => item.translations[currentLanguage]?.toLowerCase().includes(normalizedInput));
    setSuggestions(filteredSuggestions.map(item => item.translations[currentLanguage]));
  };

  const handleSuggestionClick = (suggestion) => {
    setIngredientname(suggestion);
    setSuggestions([]);
  };

  const handleShowNutritionalInfo = () => {
    setShowNutritionalInfo(true);
  };

  const handleCloseNutritionalInfo = () => {
    setShowNutritionalInfo(false);
  };

  const addIngredientToDailyInfo = async (calorias) => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await setDoc(
        dailyInfoRef,
        {
          caloriesConsumed: dailyInfo.caloriesConsumed + nutritionalData.nf_calories,
          proteinConsumed: dailyInfo.proteinConsumed + nutritionalData.nf_protein,
          fatConsumed: dailyInfo.fatConsumed + nutritionalData.nf_total_fat,
          carbsConsumed: dailyInfo.carbsConsumed + nutritionalData.nf_total_carbohydrate,
        },
        { merge: true }
      );

      console.log("Nutritional values added successfully.");
      onUserInfoChange();
    } catch (error) {
      console.error("Error adding nutritional values:", error);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.labels}>
          <div className={styles.firstInput}>
            <label className={styles.label} htmlFor="ingredientname">
              {t("ingredient")}:
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
          </div>
          <div className={styles.quantityContainer}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="quantity">
                {t("quantity")}:
              </label>
              <input
                className={styles.quantityInput}
                type="text"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <select
              className={styles.quantityTypeInput}
              value={unidade}
              onChange={handleUnidadeChange}
            >
              <option value="grams">{t("grams")}</option>
              <option value="unities">{t("portions")}</option>
              <option value="ml">{t("mililiters")}</option>
              <option value="ounces">{t("ounces")}</option>
            </select>
          </div>
        </div>
        <div>
          <button
            className={(ingredientname !== "" && parseFloat(quantity) > 0) ? "button" : "inactiveButton-medium"}
            type="submit"
            disabled={ingredientname === "" || parseFloat(quantity) <= 0}
          >
            <p>{t("calculate")}</p>
          </button>
        </div>
        <div className={styles.labels}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="calorias">
              {t("calories")}:
            </label>
            <input
              className={styles.caloriesInput}
              type="text"
              id="calorias"
              value={calorias}
              readOnly
            />
          </div>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button
          className={(calorias && calorias !== "Valor indefinido" && parseFloat(quantity) > 0) ? classNames(styles.nutriButton, "button") : "inactiveButton-medium"}
          onClick={(calorias && calorias !== "Valor indefinido" && parseFloat(quantity) > 0) ? handleShowNutritionalInfo : null}
          disabled={!calorias || calorias === "Valor indefinido" || parseFloat(quantity) <= 0}
        >
         <p> {t("nutritionalInfo")}</p>
        </button>

        <button
        onClick={addIngredientToDailyInfo}
          className={(calorias && calorias !== "Valor indefinido" && parseFloat(quantity) > 0) ? "button" : "inactiveButton-medium"}
          disabled={!calorias || calorias === "Valor indefinido" || parseFloat(quantity) <= 0}
        >
          <p>{t("addToDailyAndMacros")}</p>
        </button>
      </div>

      {showNutritionalInfo && (
        <NutritionalInfo
          ingredientname={ingredientname}
          data={nutritionalData}
          onClose={handleCloseNutritionalInfo}
          unidade={unidade}
          quantidade={quantity}
          t={t}
          userData={userData}
          dailyInfo={dailyInfo}
          ingredientImage={ingredientImage}
          user={user}
          onUserInfoChange={onUserInfoChange}
        />
      )}
    </div>
  );
};

export default Calculator;