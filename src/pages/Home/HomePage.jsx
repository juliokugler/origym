//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./HomePage.module.css";

//Components
import Header from "../../components/Header/Header";
import MealSuggestions from "../Nutrition/components/MealSuggestions/MealSuggestions"

//Page Components

import HealthCards from "./components/HealthCards/CardsContainer";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import FriendsInActivity from "./components/FriendsInActivity/FriendsInActivity";
import DailyIntakes from "../Nutrition/components/DailyIntakes/DailyIntakes"
import AiCoach from "./components/AICoach/AiCoach";

//Icons
import AICoach from "../../assets/Icons/AICoach.png";

//Hooks
import useFetchExercises from "../../hooks/useFetchExercises";

const Home = ({ greeting, meal, currentDate, t, userData, dailyInfo, user, onUserInfoChange, currentLanguage, isMobile }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutChange, setWorkoutChange] = useState(false);
  const [selectedOption, setSelectedOption] = useState(meal);

  const fetchedWorkouts = useFetchExercises(workoutChange);

  useEffect(() => {
    if (fetchedWorkouts.length > 0 && userData !== null) {
      setWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts, userData]);

  if (!userData || !dailyInfo) {
    return <p>{t("loading")}...</p>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleWorkoutCheck = () => {
    setWorkoutChange((prev) => !prev);
  };

  return (
    <div className={isMobile ? "container-mobile" : "container"}>
      <Header
        isMobile={isMobile}
        pageType="home"
        currentDate={currentDate}
        timedGreeting={greeting}
        t={t}
        userData={userData}
        userUid={user.uid}
        currentLanguage={currentLanguage}
      />
      {isMobile ? (
        <div className="mainSection-mobile">
          <section className={styles.topContainer_mobile}>
            <HealthCards t={t} isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} dailyInfo={dailyInfo} />
            <DailyIntakes t={t} userData={userData} dailyInfo={dailyInfo} isMobile={isMobile} />
          </section>
          <section className={`card ${styles.todaysWorkouts_mobile}`}>
            <h3 className="title">{t("todaysWorkout")}</h3>
            <div className={styles.innerContainer_mobile}>
              <WorkoutList
                t={t}
                isMobile={isMobile}
                workouts={workouts}
                user={user}
                onCheck={handleWorkoutCheck}
                dailyInfo={dailyInfo}
                onUserInfoChange={onUserInfoChange}
              />
            </div>
          </section>
          <section className={`card ${styles.mealSuggestionsMobile}`}>
            <div className={styles.titleAndDropdownMobile}>
              <h3 className={styles.mealSuggestionsTitle}>{t("mealSuggestions")}</h3>
              <div className={styles.dropdown}>
                <select className={styles.selection} value={selectedOption} onChange={handleOptionChange}>
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
              user={user}
            />
          </section>
        </div>
      ) : (
        <div className="mainSection">
          <section className={styles.leftSection}>
            <HealthCards t={t} isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} dailyInfo={dailyInfo} />
            <div className={styles.innerSection}>
              <div className={styles.firstColumn}>
                <article className={`card ${styles.AICoach}`}>
                  <header className={styles.titleAndIcon}>
                    <img src={AICoach} alt="AI Coach Icon" />
                    <h3 className="title">{t("AICoach")}</h3>
                  </header>
                  <AiCoach t={t} userData={userData} timedGreeting={greeting} />
                </article>
              </div>
              <div className={styles.secondColumn}>
                <article className={`card ${styles.todaysWorkouts}`}>
                  <h3 className="title">{t("todaysWorkout")}</h3>
                  <div className={styles.innerContainer}>
                    <WorkoutList
                      t={t}
                      workouts={workouts}
                      user={user}
                      onCheck={handleWorkoutCheck}
                      dailyInfo={dailyInfo}
                      onUserInfoChange={onUserInfoChange}
                    />
                  </div>
                </article>
                <article className={`card ${styles.friendsInActivity}`}>
                  <h3 className="title">{t("friendsInActivity")}</h3>
                  <FriendsInActivity t={t} user={user} userData={userData} />
                </article>
              </div>
            </div>
          </section>
          <aside className={styles.thirdColumn}>
            <section className={`mainCard ${styles.dailyIntakes}`}>
              <header className={styles.titleAndMenu}>
                <h3 className={styles.title2}>{t("dailyIntakes")}</h3>
                <button>{t("update")}</button>
              </header>
              <DailyIntakes t={t} userData={userData} dailyInfo={dailyInfo} />
            </section>
            <section className={`card ${styles.mealSuggestions}`}>
              <header className={styles.titleAndDropdown}>
                <h3 className={styles.mealSuggestionsTitle}>{t("mealSuggestions")}</h3>
                <div className={styles.dropdown}>
                  <select className={styles.selection} value={selectedOption} onChange={handleOptionChange}>
                    <option value="Breakfast">{t("Breakfast")}</option>
                    <option value="Lunch">{t("Lunch")}</option>
                    <option value="Dinner">{t("Dinner")}</option>
                    <option value="Snacks">{t("Snacks")}</option>
                    <option value="Desserts">{t("Desserts")}</option>
                    <option value="Supplementation">{t("Supplementation")}</option>
                  </select>
                </div>
              </header>
              <MealSuggestions
                onUserInfoChange={onUserInfoChange}
                dailyInfo={dailyInfo}
                meal={selectedOption}
                t={t}
                language={currentLanguage}
              />
            </section>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Home;