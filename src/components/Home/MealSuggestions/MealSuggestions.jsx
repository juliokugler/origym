//React
import React, { useState } from "react";

//Firebase
import { getFirestore, doc, setDoc } from "firebase/firestore";

//Styles
import styles from "./MealSuggestions.module.css";

//Database
import recipes from "../../../assets/JSON/Recipes.json";

//Media
import { FaFire } from "react-icons/fa";

//Components
import ViewRecipe from "../../Nutrition/SavedRecipes/RecipeDetailsPopup";

//Hooks
import { useAuthValue } from "../../../contexts/AuthContext";

const MealSuggestions = ({ meal, dailyInfo, onChange, t }) => {
  //Icons
  const imagePaths = [
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowDown_disabled.png?alt=media&token=43fca359-0f43-495a-bb4e-17480833d775",
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowDown.png?alt=media&token=683caa3c-018f-4de5-be6f-b15ee51f7763",
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowUp.png?alt=media&token=8f14ddc8-46d9-486f-8f20-b30597c9be92",
  ];

  const selectedMeal = recipes[meal];
  const [showPopupForMealId, setShowPopupForMealId] = useState(null);
  const [quantities, setQuantities] = useState(1);
  const [animateMealId, setAnimateMealId] = useState(null);
  const { user } = useAuthValue();

  if (!selectedMeal) return `${t("noMatches")}`;

  const handleOpenPopup = (mealId) => {
    setShowPopupForMealId(mealId);
  };

  const handleClosePopup = () => {
    setShowPopupForMealId(null);
  };

  const handleQuantityChange = (mealId, change) => {
    setQuantities((prev) => {
      const newQuantity = (prev[mealId] || 1) + change;
      return { ...prev, [mealId]: Math.max(1, newQuantity) };
    });
  };

  const addMealToDailyInfo = async (mealId) => {
    const meal = selectedMeal.find((meal) => meal.id === mealId);
    const quantity = quantities[mealId] || 1;
    const addedCalories = meal.totalCalories * quantity;
    const addedProtein = meal.protein * quantity;
    const addedFat = meal.fat * quantity;
    const addedCarbs = meal.carbs * quantity;

    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await setDoc(
        dailyInfoRef,
        {
          caloriesConsumed: dailyInfo.caloriesConsumed + addedCalories,
          proteinConsumed: dailyInfo.proteinConsumed + addedProtein,
          fatConsumed: dailyInfo.fatConsumed + addedFat,
          carbsConsumed: dailyInfo.carbsConsumed + addedCarbs,
        },
        { merge: true }
      );

      console.log("Nutritional values added successfully.");
      onChange();
    } catch (error) {
      console.error("Error adding nutritional values:", error);
    }

    setAnimateMealId(mealId);
    setTimeout(() => setAnimateMealId(null), 500); // Remove animation class after 0.5s
  };

  return (
    <div className={styles.container}>
      {selectedMeal.map((meal) => (
        <div className={styles.mealCard} key={meal.id}>
          <div className={styles.cardContent}>
            <div
              onClick={() => handleOpenPopup(meal.id)}
              className={styles.mealImageAndInfo}
            >
              {meal.image && (
                <img
                  className={styles.mealImage}
                  src={meal.image}
                  alt={meal.title}
                />
              )}
              <div className={styles.mealInfo}>
                <p>{meal.title}</p>{" "}
                <p className={animateMealId === meal.id ? styles.pulse : ""}>
                  <FaFire /> {meal.totalCalories * (quantities[meal.id] || 1)}{" "}
                  {t("calories")}
                </p>
              </div>
            </div>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(meal.id, -1)}
                disabled={quantities[meal.id] === 1}
              >
                <img
                  src={
                    quantities[meal.id] === 1 ? imagePaths[0] : imagePaths[1]
                  }
                  alt="Decrease quantity"
                />
              </button>
              <span>{quantities[meal.id] || 1}</span>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(meal.id, 1)}
              >
                <img src={imagePaths[2]} alt="Increase quantity" />
              </button>
            </div>
            <div
              className={styles.addButton}
              onClick={() => addMealToDailyInfo(meal.id)}
            >
              <p>{t("add")}</p>
            </div>
          </div>
          {showPopupForMealId === meal.id && (
            <div className={styles.popup}>
              <ViewRecipe recipe={meal} onClose={handleClosePopup} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealSuggestions;
