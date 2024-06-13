import React, { useState } from "react";
import styles from "./Step3.module.css";
import { FaEdit } from "react-icons/fa";
import StepIndicator from "../../StepIndicator/StepIndicator";
import DaySelector from "../../DaySelector/DaySelector";

const Step3 = ({ onNext, onPrevious, ingredients, dayFromCard, mealFromCard, onCreate, t }) => {
  const [recipeName, setRecipeName] = useState("");
  const [selectedDays, setSelectedDays] = useState([dayFromCard || "Sun"]);
  const [mealType, setMealType] = useState(mealFromCard || "Breakfast");
  const [photo, setPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FFrame%20714.png?alt=media&token=2203b4ab-abd2-464d-b010-2991b72cbdea");
  const [isShowEditPhoto, setIsShowEditPhoto]= useState(false)

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const index = prevSelectedDays.indexOf(day);
      if (index === -1) {
        return [...prevSelectedDays, day];
      } else {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }
    });
  };

const toggleShowEditPhoto = () => {
  setIsShowEditPhoto((prev) => !prev)
}

  const handleNextClick = () => {
    const mealInfo = {
      recipeName: recipeName || "meal", // Default to "meal" if not provided
      selectedDays,
      mealType,
      photo: photo || "", // Make photo optional
      ingredients, // Make sure ingredients are included in mealInfo
    };
    onNext(mealInfo);
    onCreate(mealInfo);
  };

  const handleDaySelect = (day) => {
    toggleDaySelection(day);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>{t("recipeDetails")}</h2>
      <StepIndicator currentStep={3} />
      <div className={styles.nameContainer}>
        <div className={styles.imageContainer}>
          <img src="https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Icons%2FFrame%20714.png?alt=media&token=2203b4ab-abd2-464d-b010-2991b72cbdea"
 alt="Recipe" className={styles.recipeImage} />
          <FaEdit onClick={toggleShowEditPhoto} className={styles.editIcon} />
        </div>
        <label className={styles.label}>
        <p>{t("recipeName")}:</p>
          <input
            type="text"
            placeholder={t("nameYourRecipe")}
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>
      </div>{isShowEditPhoto && 
      <div className={styles.label}>
        <p className={styles.upload}>{t("recipeImage")}:</p>
        <div className={styles.photoUploadInputs}>
        <button className="notSelectedButton-medium">{t("uploadPicture")}</button>
        <p> {t("or")}</p>  <input
        className={styles.photoUploadInput}
          type="text"
          placeholder={t("imageURL")}
          value={photo}
          onChange={handlePhotoChange}
        />
                  </div>
      </div>}
      <div>
        <label className={styles.label}>
          <p>{t("selectMealType")}:</p>
          <div className={styles.buttonRow}>
            <button
              className={mealType === "Breakfast" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setMealType("Breakfast")}
            >
              {t("Breakfast")}
            </button>
            <button
              className={mealType === "Lunch" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setMealType("Lunch")}
            >
              {t("Lunch")}
            </button>
            <button
              className={mealType === "Dinner" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setMealType("Dinner")}
            >
              {t("Dinner")}
            </button>
            <button
              className={mealType === "Snacks" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setMealType("Snacks")}
            >
              {t("Snacks")}
            </button>
            <button
              className={mealType === "Supplementation" ? "button-small" : "notSelectedButton-small"}
              onClick={() => setMealType("Supplementation")}
            >
              {t("Supplementation")}
            </button>
          </div>
        </label>
      </div>
      <div className={styles.label}>
      <p>{t("selectDaysOfTheWeek")}:</p>
        <DaySelector selectedDays={selectedDays} handleDaySelect={handleDaySelect} />
      </div>
     
      <div className={styles.buttonContainer}>
        <button className="notSelectedButton-medium" onClick={onPrevious}>
        {t("back")}
        </button>
        <button className="button" onClick={handleNextClick}>
        {t("next")}
        </button>
      </div>
    </div>
  );
};

export default Step3;