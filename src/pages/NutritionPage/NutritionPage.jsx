//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./NutritionPage.module.css";
import classNames from "classnames"

//Components
import MealCalendar from "../../components/Nutrition/MealCalendar/MealCalendar";
import Header from "../../components/Header/Header";
import DailyIntakes from "../../components/Nutrition/DailyIntakes/DailyIntakes";
import Calculator from "../../components/Nutrition/Calculator/Calculator";
import MealPlanner from "../../components/Nutrition/MealPlanner/MealPlanner";
import WaterIntake from "../../components/Nutrition/WaterIntake/WaterIntake";
import MealSuggestions from "../../components/Home/MealSuggestions/MealSuggestions";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";

//Hooks
import useFetchUserData from "../../hooks/useFetchUserData";

const NutritionPage = ({ meal, mealNumber, t }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());
  const [currentExerciseListName, setCurrentExerciseListName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Standard");
  const [showMealPlannerPopup, setShowMealPlannerPopup] = useState(false);
  const [mealType, setMealType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [rerenderCalendar, setRerenderCalendar] = useState(false);
  const { user } = useAuthValue();
  const [selectedOption, setSelectedOption] = useState(meal);
  const [intakeChange, setIntakeChange] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleIntakeChange = (intakeChange) => {
    setIntakeChange((prev) => !prev);
  };

  const handleMealPlannerToggle = (mealType, selectedDay) => {
    setShowMealPlannerPopup((prev) => !prev);
    setMealType(mealType);
    setSelectedDay(selectedDay);
  };

  const userData = useFetchUserData(intakeChange);

  const handleCorrectSubmit = () => {
    setRerenderCalendar((prev) => !prev);
  };

  return (
    <div className="container">
      <Header t={t} pageType="nutrition" />

      <div className="mainSection">
        <div className={styles.firstColumn}>
        <div className={classNames("mainCard", styles.dailyIntakes)}>
            <div className={styles.titleAndMenu}>
              <h3 className={styles.title2}>{t("dailyIntakes")}</h3>
              <u>{t("update")}</u>
            </div>
            <DailyIntakes
              t={t}
              userData={userData.userProfile}
              dailyData={userData.dailyInfo}
            />
          </div>

          <div className={classNames("card", styles.mealSuggestions)}>
            <div className={styles.titleAndDropdown}>
              <h3 className={styles.mealSuggestionsTitle}>
                {t("mealSuggestions")}
              </h3>
              <div className={styles.dropdown}>
                <select
                  className={styles.selection}
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="Breakfast">{t("Breakfast")}</option>
                  <option value="Lunch">{t("Lunch")}</option>
                  <option value="Dinner">{t("Dinner")}</option>
                  <option value="Snacks">{t("Snacks")}</option>
                  <option value="Desserts">{t("Desserts")}</option>
                  <option value="Supplementation">
                    {t("Supplementation")}
                  </option>
                </select>
              </div>
            </div>
            <MealSuggestions
              t={t}
              dailyInfo={userData.dailyInfo}
              onChange={handleIntakeChange}
              meal={selectedOption}
            />
          </div>
        </div>
        <div className={styles.secondColumn}>
        <div className={classNames("card", styles.mealPlan)}>
            <h3 className="title">{t("mealPlan")}</h3>
            <MealCalendar
              t={t}
              rerender={rerenderCalendar}
              onOpen={handleMealPlannerToggle}
              mealNumber={mealNumber}
            />
          </div>
        </div>

        <div className={styles.thirdColumn}>
        <div className={classNames("card", styles.waterIntake)}>
            <h3 className="title">{t("waterIntake")}</h3>
            <WaterIntake t={t} userData={userData.userProfile} />
          </div>
          <div className={styles.bottomSection}>
          <div className={classNames("card", styles.calculator)}>
              <h3 className="title">{t("nutritionalCalculator")}</h3>
              <Calculator t={t} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.featuredSection}></div>
      {showMealPlannerPopup && (
        <MealPlanner
          t={t}
          onCorrectSubmit={handleCorrectSubmit}
          dayFromCard={selectedDay}
          mealFromCard={mealType}
          onClose={handleMealPlannerToggle}
        />
      )}
    </div>
  );
};

export default NutritionPage;
