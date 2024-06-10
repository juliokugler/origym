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
import MealSuggestions from "../../components/Nutrition/MealSuggestions/MealSuggestions";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";


const NutritionPage = ({ meal, mealNumber, t, userData, dailyInfo, onUserInfoChange, user }) => {
  const [showMealPlannerPopup, setShowMealPlannerPopup] = useState(false);
  const [mealType, setMealType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [rerenderCalendar, setRerenderCalendar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(meal);

  if (!userData || dailyInfo == null || dailyInfo == undefined ) {
    return <p>{t("loading")}...</p>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    const handleMealPlannerToggle = (mealType, selectedDay) => {
    setShowMealPlannerPopup((prev) => !prev);
    setMealType(mealType);
    setSelectedDay(selectedDay);
  };



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
              userData={userData}
              dailyInfo={dailyInfo}
              
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
              dailyInfo={dailyInfo}
              meal={selectedOption}
              onUserInfoChange={onUserInfoChange}
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
            <WaterIntake t={t} userData={userData} dailyInfo={dailyInfo} />
          </div>
          <div className={styles.bottomSection}>
          <div className={classNames("card", styles.calculator)}>
              <h3 className="title">{t("nutritionalCalculator")}</h3>
              <Calculator   t={t}
              userData={userData}
              dailyInfo={dailyInfo}
              onUserInfoChange={onUserInfoChange}
              user={user}
               />
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
