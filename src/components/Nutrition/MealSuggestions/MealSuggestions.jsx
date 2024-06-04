import React, { useState, useEffect, useMemo } from "react";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import styles from "./MealSuggestions.module.css";
import { FaFire } from "react-icons/fa";
import RecipeDetails from "../../Nutrition/RecipeDetails/RecipeDetails";
import { useAuthValue } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const MealSuggestions = ({ meal, dailyInfo, onUserInfoChange }) => {
  const { t, i18n } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [showPopupForMealId, setShowPopupForMealId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [animateMealId, setAnimateMealId] = useState(null);
  const { user } = useAuthValue();
  const imagePaths = [
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowDown_disabled.png?alt=media&token=43fca359-0f43-495a-bb4e-17480833d775",
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowDown.png?alt=media&token=683caa3c-018f-4de5-be6f-b15ee51f7763",
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FarrowUp.png?alt=media&token=8f14ddc8-46d9-486f-8f20-b30597c9be92",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const cachedData = localStorage.getItem(`recipes-${meal}`);
      const currentTime = new Date().getTime();
      const dayInMilliseconds = 24 * 60 * 60 * 1000;

      if (cachedData) {
        const { recipes: cachedRecipes, timestamp } = JSON.parse(cachedData);

        // Check if cached data is older than one day
        if (currentTime - timestamp < dayInMilliseconds) {
          setRecipes(cachedRecipes);
          return;
        }
      }

      const db = getFirestore();
      const mealCollection = collection(db, 'mealSuggestions', meal, 'meals');
      try {
        const querySnapshot = await getDocs(mealCollection);
        const recipesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(recipesList);
        localStorage.setItem(
          `recipes-${meal}`,
          JSON.stringify({ recipes: recipesList, timestamp: currentTime })
        );
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [meal]);

  const memoizedRecipes = useMemo(() => recipes, [recipes]);

  if (memoizedRecipes.length === 0) return <p>{t("noMatches")}</p>;

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
    const meal = memoizedRecipes.find((meal) => meal.id === mealId);
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
      onUserInfoChange();
    } catch (error) {
      console.error("Error adding nutritional values:", error);
    }

    setAnimateMealId(mealId);
    setTimeout(() => setAnimateMealId(null), 500);
  };

  const language = i18n.language; // Get the current language

  return (
    <div className={styles.container}>
      {memoizedRecipes.map((meal) => (
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
                  alt={t(meal.title[language])}
                />
              )}
              <div className={styles.mealInfo}>
                <p>{meal.title[language]}</p>
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
              <RecipeDetails t={t} language={language} recipe={meal} onClose={handleClosePopup} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealSuggestions;