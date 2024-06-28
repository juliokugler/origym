import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./MealCalendar.module.css";
import { db } from '../../../firebase/config';  // Import your Firebase config file
import { collection, doc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import arrowDown from "../../../assets/Icons/ArrowDown.png";
import arrowUp from "../../../assets/Icons/ArrowUp.png";
import DaySelector from "../../DaySelector/DaySelector";
import mealCardIcon from "../../../assets/Icons/mealCard.png"
import mealCardIconInactive from "../../../assets/Icons/mealCard_inactive.png"
import { FaFire } from "react-icons/fa";

const MealCalendar = ({ onOpen, rerender, meal, mealNumber, user }) => {
  const [meals, setMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { t } = useTranslation();
  const [openMealIndex, setOpenMealIndex] = useState(mealNumber);

  useEffect(() => {
    const getCurrentDay = () => {
      const today = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[today.getDay()];
    };

    setSelectedDay(getCurrentDay());
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const dayRef = doc(db, "users", user.uid, "meals", selectedDay);
        const daySnapshot = await getDoc(dayRef);
  
        if (daySnapshot.exists()) {
          const dayData = daySnapshot.data();
          const mealTypes = Object.keys(dayData);
  
          // Filter out any non-meal type keys
          const validMealTypes = mealTypes.filter(type => ["Breakfast", "Lunch", "Dinner", "Snacks", "Supplementation"].includes(type));
  
          // Extract meal data for each meal type
          const fetchedMeals = validMealTypes.map(type => {
            const mealsWithType = dayData[type].map(meal => ({
              mealType: type,
              ingredients: meal.ingredients,
              photo: meal.photo,
              recipeName: meal.recipeName,
              totalCalories: meal.totalCalories
            }));
            return mealsWithType;
          }).flat();
  
          setMeals(fetchedMeals);
        } else {
          console.log("No meals found for the selected day:", selectedDay);
          setMeals([]);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
  
    if (selectedDay) {
      fetchMeals();
    }
  }, [selectedDay, user.uid]);


  console.log(meals)
  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Supplementation",
  ];
  const translatedMealTypes = mealTypes.map((type) => t(type));

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleOpenMealPlanner = (mealType, selectedDay) => {
    onOpen(mealType, selectedDay);
  };

  const toggleMealContainer = (index) => {
    setOpenMealIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.card}>
      <DaySelector selectedDay={selectedDay} handleDaySelect={handleDaySelect} />
      {selectedDay && (
        <div className={styles.mealsContainer}>
          <div className={styles.meals}>
            <ul className={styles.mealsList}>
              {translatedMealTypes.map((mealType, mealIndex) => {
                const mealData = meals.find((meal) => meal.mealType === mealTypes[mealIndex]);
                const isOpen = openMealIndex === mealIndex;
                const hasMeal = meals.some((meal) => meal.mealType === mealTypes[mealIndex]);
  
                return (
                  <li key={mealIndex}>
                    <div
                      className={classNames(styles.mealCard, {
                        [styles.opened]: isOpen,
                      })}
                    >
                      <div
                        className={styles.titleAndIcon}
                        onClick={() => toggleMealContainer(mealIndex)}
                      >
                        <h4 className={styles.mealAndIcon}>
                          
                          {hasMeal && (
                            <img
                              src={mealCardIcon}
                              alt="Meal Icon"
                              className={styles.mealIcon}
                            />
                          )}
                          {!hasMeal && (
                            <img
                              src={mealCardIconInactive}
                              alt="Inactive Meal Icon"
                              className={styles.mealIcon}
                            />
                          )}{mealType}
                        </h4>
                        <img
                          className={styles.arrowIcon}
                          src={isOpen ? arrowUp : arrowDown}
                          alt={isOpen ? "Arrow Up" : "Arrow Down"}
                        />
                      </div>
                      {isOpen && (
                        <div>
                          <ul>
                            {meals
                              .filter((meal) => meal.mealType === mealTypes[mealIndex])
                              .map((meal, mealIdx) => (
                                <li key={mealIdx}>
                                  <div className={styles.mealDisplay}>
                                    <img
                                      src={meal.photo}
                                      alt={meal.recipeName}
                                      className={styles.ingredientPhoto}
                                    /> <div className={styles.mealInfo}>
                                    <p>{meal.recipeName}</p><p>
                  <FaFire /> {meal.totalCalories}{" "}
                  {t("calories")}
                </p></div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          
          </div>
        </div>
      )}    <div
                            className={styles.buttonContainer}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenMealPlanner(selectedDay);
                            }}
                          >
                            <button className="notSelectedButton-medium">
                              {t("addMeal")}
                            </button>
                          </div>
    </div>
  );
};

export default MealCalendar;