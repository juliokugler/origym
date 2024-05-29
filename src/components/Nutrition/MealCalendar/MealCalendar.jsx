import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./MealCalendar.module.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useAuthValue } from "../../../contexts/AuthContext";
import arrowDown from "../../../assets/Icons/ArrowDown.png";
import arrowUp from "../../../assets/Icons/ArrowUp.png";
import DaySelector from "../../DaySelector/DaySelector";

const MealCalendar = ({ onOpen, rerender, meal, mealNumber }) => {
  const [meals, setMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { t } = useTranslation();
  const { user } = useAuthValue();
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
        const firestore = getFirestore();
        const dayDocumentRef = doc(
          firestore,
          "mealPlan",
          user.uid,
          "meals",
          selectedDay
        );
        const daySnapshot = await getDoc(dayDocumentRef);
        const dayData = daySnapshot.exists() ? daySnapshot.data() : null;

        if (dayData) {
          const mealsData = Object.entries(dayData.meals || {}).map(
            ([mealType, ingredients]) => ({
              mealType,
              ingredients: Object.values(ingredients),
            })
          );
          setMeals(mealsData);
        } else {
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

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Supplementation",
  ].map((type) => t(type));

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
              {mealTypes.map((mealType, mealIndex) => {
                const mealData = meals.find(
                  (data) => data.mealType === mealType
                );
                const isOpen = openMealIndex === mealIndex;
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
                        <h4>{mealType}</h4>
                        <img
                          className={styles.arrowIcon}
                          src={isOpen ? arrowUp : arrowDown}
                          alt={isOpen ? "Arrow Up" : "Arrow Down"}
                        />
                      </div>
                      {isOpen && (
                        <div>
                          <div
                            className={styles.openButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenMealPlanner(mealType, selectedDay);
                            }}
                          >
                            <p>
                              <u>{t("addMeal")}</u>
                            </p>
                          </div>
                          {mealData && (
                            <ul>
                              {mealData.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                  <p>
                                    {ingredient.quantity} {ingredient.quantityType}{" "}
                                    of {ingredient.ingredient}
                                  </p>
                                </li>
                              ))}
                              <li className={styles.addButton}>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenMealPlanner(mealType, selectedDay);
                                  }}
                                ></div>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCalendar;