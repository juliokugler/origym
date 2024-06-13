import React, { useState, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3";
import Step4 from "./Step4";
import styles from "./MealPlanner.module.css";
import { db } from '../../../firebase/config';  // Assuming you have configured Firebase in this file
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const MealPlanner = ({ onClose, dayFromCard, mealFromCard, onCorrectSubmit, userUid, t }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [mealType, setMealType] = useState("");
  const [mealInfo, setMealInfo] = useState({});
  const [selectedDay, setSelectedDay] = useState(dayFromCard);
  const [totalCalories, setTotalCalories] = useState(0);
  const [number, setNumber] = useState(null);

  const handleNext = (data) => {
    if (currentPage === 1) {
      setMealType(data);
    } else if (currentPage === 2) {
      setIngredients(data.ingredients);
      setTotalCalories(data.totalCalories); // Update totalCalories separately
      setMealInfo((prevMealInfo) => ({
        ...prevMealInfo,
        ingredients: data.ingredients,
        totalCalories: data.totalCalories, // Include totalCalories in mealInfo
      }));
    } else if (currentPage === 3) {
      setMealInfo({ ...mealInfo, ...data, totalCalories }); // Ensure totalCalories is included in mealInfo
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  console.log(userUid)

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setNumber(null);
  };

  const handleSubmitToFirebase = async (finalMealInfo) => {
    const { mealType, ingredients, selectedDays, recipeName = "meal", totalCalories, photo = "" } = finalMealInfo;

    // Log the fields to debug
    console.log("mealType:", mealType);
    console.log("ingredients:", ingredients);
    console.log("selectedDays:", selectedDays);
    console.log("recipeName:", recipeName);
    console.log("totalCalories:", totalCalories);
    console.log("photo:", photo);

    if (!mealType || !ingredients || !selectedDays || !totalCalories) {
      console.error("Some required fields are undefined.");
      return;
    }

    try {
      for (const day of selectedDays) {
        const mealPlanRef = doc(db, "users", userUid, "meals", day);
        const mealPlanSnapshot = await getDoc(mealPlanRef);

        const newMealData = {
          mealType,
          ingredients,
          recipeName,
          totalCalories,
          photo,
        };

        if (mealPlanSnapshot.exists()) {
          await setDoc(
            mealPlanRef,
            {
              ...mealPlanSnapshot.data(),
              [mealType]: mealPlanSnapshot.data()[mealType]
                ? [...mealPlanSnapshot.data()[mealType], newMealData]
                : [newMealData],
            },
            { merge: true }
          );
        } else {
          await setDoc(mealPlanRef, {
            [mealType]: [newMealData],
          });
        }
      }

      console.log("Meal added successfully to Firebase.");
      setMealType("");
      setIngredients([]);
      setMealInfo({});
      setNumber(null);
      setSelectedDay(dayFromCard);
      setTotalCalories(0);
    } catch (error) {
      console.error("Error adding meal to Firebase:", error);
    }
  };

  const handleCreate = (finalMealInfo) => {
    setMealInfo(finalMealInfo);
    setCurrentPage(4)
  };

  useEffect(() => {
    if (currentPage === 4 && Object.keys(mealInfo).length > 0) {
      handleSubmitToFirebase({ ...mealInfo, totalCalories }); // Pass totalCalories explicitly
      setCurrentPage(1);
    }
  }, [mealInfo, totalCalories]);

  return (
    <div>
      {currentPage !== 0 && (
        <div className={styles.background}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={onClose}>Close</button>
            {currentPage === 1 && <Step1 onNext={handleNext} t={t} />}
            {currentPage === 2 && (
              <Step2
                onNext={handleNext}
                onPrevious={handlePrevious}
                mealType={mealType}
                t={t}
              />
            )}
            {currentPage === 3 && (
              <Step3
                onNext={handleNext}
                onPrevious={handlePrevious}
                ingredients={ingredients}
                dayFromCard={dayFromCard}
                mealFromCard={mealFromCard}
                onCreate={handleCreate}
                t={t}
              />
            )}
            {currentPage === 4 && <Step4 onCreate={() => handleCreate(mealInfo)} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;