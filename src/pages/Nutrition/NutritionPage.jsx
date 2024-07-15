// React
import React, { useState, useEffect } from "react";

// Styles
import styles from "./NutritionPage.module.css";
import classNames from "classnames";

//Components
import Header from "../../components/Header/Header";

//Page Components
import MealCalendar from "./components/MealCalendar/MealCalendar";
import DailyIntakes from "./components/DailyIntakes/DailyIntakes";
import Calculator from "./components/Calculator/Calculator";
import MealPlanner from "./components/MealPlanner/MealPlanner";
import WaterIntake from "./components/WaterIntake/WaterIntake";
import MealSuggestions from "./components/MealSuggestions/MealSuggestions";

const NutritionPage = ({
  meal,
  mealNumber,
  t,
  userData,
  dailyInfo,
  onUserInfoChange,
  user,
  currentLanguage,
  isMobile,
}) => {
  const [showMealPlannerPopup, setShowMealPlannerPopup] = useState(false);
  const [mealType, setMealType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [rerenderCalendar, setRerenderCalendar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(meal);

  if (!userData || !dailyInfo) {
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
    <div className={isMobile ? "container-mobile" : "container"}>
      <Header isMobile={isMobile} userData={userData} t={t} pageType="nutrition" />
      {!isMobile ? (
        <main className="mainSection">
          <section className={styles.firstColumn}>
            <article className={classNames("mainCard", styles.dailyIntakes)}>
              <div className={styles.titleAndMenu}>
                <h3 className={styles.title2}>{t("dailyIntakes")}</h3>
                <u>{t("update")}</u>
              </div>
              <DailyIntakes t={t} userData={userData} dailyInfo={dailyInfo} />
            </article>
            <article className={classNames("card", styles.mealSuggestions)}>
              <div className={styles.titleAndDropdown}>
                <h3 className={styles.mealSuggestionsTitle}>{t("mealSuggestions")}</h3>
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
                    <option value="Supplementation">{t("Supplementation")}</option>
                  </select>
                </div>
              </div>
              <MealSuggestions
                t={t}
                dailyInfo={dailyInfo}
                meal={selectedOption}
                onUserInfoChange={onUserInfoChange}
                language={currentLanguage}
                user={user}
              />
            </article>
          </section>
          <section className={styles.secondColumn}>
            <article className={classNames("card", styles.mealPlan)}>
              <h3 className="title">{t("mealPlan")}</h3>
              <MealCalendar
                t={t}
                rerender={rerenderCalendar}
                onOpen={handleMealPlannerToggle}
                mealNumber={mealNumber}
                user={user}
              />
            </article>
          </section>
          <section className={styles.thirdColumn}>
            <article className={classNames("card", styles.waterIntake)}>
              <h3 className="title">{t("waterIntake")}</h3>
              <WaterIntake t={t} userData={userData} dailyInfo={dailyInfo} />
            </article>
            <article className={classNames("card", styles.calculator)}>
              <h3 className="title">{t("nutritionalCalculator")}</h3>
              <Calculator
                t={t}
                userData={userData}
                dailyInfo={dailyInfo}
                onUserInfoChange={onUserInfoChange}
                user={user}
                currentLanguage={currentLanguage}
              />
            </article>
          </section>
        </main>
      ) : (
        <main className="mainSectio-mobile">
          <section className={styles.topContainerMobile}>
            <DailyIntakes t={t} userData={userData} dailyInfo={dailyInfo} isMobile={isMobile} />
            <div className={styles.quickActions}>
              <div className={classNames("card", styles.card)} onClick={() => setShowMealPlannerPopup(true)}>
                <h3>{t("mealPlanner")}</h3>
              </div>
              <div className={classNames("card", styles.card)}>
                <h3>{t("mealCalendar")}</h3>
              </div>
              <div className={classNames("card", styles.card)}>
                <h3>{t("nutritionalCalculator")}</h3>
              </div>
            </div>
          </section>
          <section className={`card ${styles.mealSuggestionsMobile}`}>
            <div className={styles.titleAndDropdownMobile}>
              <h3 className={styles.mealSuggestionsTitle}>{t("mealSuggestions")}</h3>
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
                  <option value="Supplementation">{t("Supplementation")}</option>
                </select>
              </div>
            </div>
            <MealSuggestions
              onUserInfoChange={onUserInfoChange}
              dailyInfo={dailyInfo}
              meal={selectedOption}
              t={t}
              language={currentLanguage}
              isMobile={isMobile}
            />
          </section>
        </main>
      )}
      {showMealPlannerPopup && (
        <MealPlanner
          t={t}
          userUid={user.uid}
          onCorrectSubmit={handleCorrectSubmit}
          dayFromCard={selectedDay}
          mealFromCard={mealType}
          onClose={handleMealPlannerToggle}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default NutritionPage;