import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3";
import Step4 from "./Step4";
import styles from "./MealPlanner.module.css";

const MealPlanner = ({ onClose, dayFromCard, mealFromCard, onCorrectSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [mealType, setMealType] = useState("");
  const [mealInfo, setMealInfo] = useState({});

  const handleNext = (data) => {
    if (currentPage === 1) {
      setMealType(data);
    } else if (currentPage === 2) {
      setIngredients(data);
    } else if (currentPage === 3) {
      setMealInfo(data);
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
            {currentPage === 1 && <Step1 onNext={handleNext} />}
            {currentPage === 2 && (
              <Step2
                onNext={handleNext}
                onPrevious={handlePrevious}
                mealType={mealType}
              />
            )}
            {currentPage === 3 && (
              <Step3
                onNext={handleNext}
                onPrevious={handlePrevious}
                ingredients={ingredients}
                dayFromCard={dayFromCard}
                mealFromCard={mealFromCard}
              />
            )}
            {currentPage === 4 && <Step4 onCreate={handleCreate} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;