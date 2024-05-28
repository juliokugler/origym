import React, { useState } from "react";
import styles from "./MealPopup.module.css";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  setDoc,
} from "firebase/firestore";
import { useAuthValue } from "../../../contexts/AuthContext";
import { useTranslation, t } from "react-i18next"; // Import useTranslation and t

const MealPopup2 = ({
  onNext,
  onPrevious,
  ingredients,
  dayFromCard,
  mealFromCard,
  onCorrectSubmit,
}) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const meals = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desserts",
    "Supplementation",
    "Snacks",
  ];
  const [selectedDays, setSelectedDays] = useState([dayFromCard]); // Initialize selectedDays with weekDay prop
  const [selectedMeals, setSelectedMeals] = useState([mealFromCard]);
  const [mealInfo, setMealInfo] = useState([]);
  const { user } = useAuthValue();
  const [formError, setFormError] = useState("");

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

  const toggleMealSelection = (meal) => {
    setSelectedMeals((prevSelectedMeals) => {
      const index = prevSelectedMeals.indexOf(meal);
      if (index === -1) {
        return [...prevSelectedMeals, meal]; // Add meal to the list if not already selected
      } else {
        return prevSelectedMeals.filter(
          (selectedMeal) => selectedMeal !== meal
        ); // Remove meal from the list if already selected
      }
    });
  };

  const mapToEnglishMeals = (selectedMeals) => {
    const englishMeals = {
      "Café da Manhã": "Breakfast",
      Almoço: "Lunch",
      Jantar: "Dinner",
      Sobremesas: "Desserts",
      Suplementação: "Supplementation",
      Lanches: "Snacks",
    };

    return selectedMeals.map((meal) => englishMeals[meal]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      selectedMeals.length > 0 &&
      selectedDays.length > 0 &&
      ingredients.length > 0
    ) {
      try {
        const firestore = getFirestore();
        const englishDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Iterate through selected days
        for (const day of selectedDays) {
          const dayDocumentRef = doc(
            firestore,
            "mealPlan",
            user.uid,
            "meals", // Add "meals" array to the path
            day
          );

          // Get the existing data of the day or create a new one
          const daySnapshot = await getDoc(dayDocumentRef);
          const dayData = daySnapshot.exists()
            ? daySnapshot.data()
            : { meals: {} };

          // Get the existing meals for the selected day or initialize an empty object
          const existingMeals = dayData.meals || {};

          // Iterate through selected meals
          for (const selectedMeal of selectedMeals) {
            // Map selected meal to English if necessary
            const englishMeal = mapToEnglishMeals([selectedMeal])[0];

            // Skip processing if meal name is not found in English meals mapping
            if (!englishMeal) continue;

            // Initialize mealData object to store data for the current meal
            const mealData = existingMeals[englishMeal] || {};

            // Find the highest index in the existing meal data for the selected meal
            let highestIndex = -1;
            Object.keys(mealData).forEach((index) => {
              highestIndex = Math.max(highestIndex, parseInt(index));
            });

            // Add the new ingredients to the meal data with unique indexes
            ingredients.forEach(({ name, quantity, quantityType }, index) => {
              const newIndex = highestIndex + index + 1; // Calculate new index
              mealData[newIndex] = {
                ingredient: name,
                quantity,
                quantityType,
              };
            });

            // Update the meal data for the current meal
            existingMeals[englishMeal] = mealData;
          }

          // Update the document with the updated meals
          await setDoc(
            dayDocumentRef,
            { meals: existingMeals },
            { merge: true }
          );
        }

        console.log("Meal documents submitted successfully!");
        onNext();
        onCorrectSubmit();
      } catch (error) {
        console.error("Error submitting meal:", error);
        setFormError("Failed to submit meal. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{t("Meal Planner")}</h2> {/* Translate "Meal Planner" */}
      <div className={styles.options}>
        <div className={styles.option}>
          <p>{t("Select Meals")}:</p> {/* Translate "Select Meals" */}
          <div className={styles.mealsContainer}>
            {meals.map((meal) => (
              <button
                key={meal}
                className={`${styles.mealCard} ${
                  selectedMeals.includes(meal) ? styles.selectedMeal : ""
                }`}
                onClick={() => toggleMealSelection(meal)}
              >
                {t(meal)} {/* Translate meal names */}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.option}>
          <label htmlFor="dayOfWeek">
            <p>{t("Assign Day(s) of the Week")}:</p>{" "}
            {/* Translate "Assign Day(s) of the Week" */}
          </label>
          <div className={styles.dayOfWeekContainer}>
            {days.map((day) => (
              <div
                key={day}
                className={`${styles.dayCircle} ${
                  selectedDays.includes(day) ? styles.selected : ""
                }`}
                onClick={() => toggleDaySelection(day)}
              >
                {t(day)} {/* Translate day names */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.Buttons}>
        <button onClick={onPrevious}>{t("Previous")}</button>{" "}
        {/* Translate "Previous" */}
        <button onClick={handleSubmit}>{t("Next")}</button>{" "}
        {/* Translate "Next" */}
      </div>
    </div>
  );
};

export default MealPopup2;
