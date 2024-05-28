import React, { useState, useEffect } from "react";
import MealPopup1 from "./MealPopup1";
import MealPopup2 from "./MealPopup2";
import MealPopup3 from "./MealPopup3";
import styles from "./MealPlanner.module.css";

const MealPlanner = ({
  onClose,
  dayFromCard,
  mealFromCard,

  onCorrectSubmit,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("");
  const [meal, setMeal] = useState([]);

  const handleNext = (ingredientList) => {
    setCurrentPage(2);
    setIngredients(ingredientList);
  };

  const handleSecondNext = (mealInfo) => {
    setCurrentPage(3);
    setMeal(mealInfo);
  };

  useEffect(() => {
    console.log("Meal:", meal);
  }, [meal]); // Log meal whenever it changes

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCreate = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      {currentPage !== 0 && (
        <div className={styles.background}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={onClose}>
              Close
            </button>
            {currentPage === 1 && (
              <div className={styles.section}>
                <MealPopup1 onNext={handleNext} />
              </div>
            )}
            {currentPage === 2 && (
              <div className={styles.section}>
                <MealPopup2
                  onNext={handleSecondNext}
                  onPrevious={handlePrevious}
                  ingredients={ingredients}
                  dayFromCard={dayFromCard}
                  mealFromCard={mealFromCard}
                  onCorrectSubmit={onCorrectSubmit}
                />
              </div>
            )}
            {currentPage === 3 && (
              <div className={styles.section}>
                <MealPopup3 onCreate={handleCreate} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
