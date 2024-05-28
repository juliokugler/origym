//React//
import React, { useState, useEffect } from "react";

//Styles
import styles from "./HomePage.module.css";

//Components
import Header from "../../components/Header/Header";
import HealthCards from "../../components/Home/HealthCards/HealthCards";
import WorkoutList from "./WorkoutList";
import MealSuggestions from "../../components/Home/MealSuggestions/MealSuggestions";
import FriendsInActivity from "../../components/Home/FriendsInActivity/FriendsInActivity";
import DailyIntakes from "../../components/Nutrition/DailyIntakes/DailyIntakes";

//Media
import AICoach from "../../assets/Icons/AICoach.png";

//Hooks
import useFetchUserData from "../../hooks/useFetchUserData";
import useFetchExercises from "../../hooks/useFetchExercises";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";
import AiCoach from "../../components/Home/AICoach/AiCoach";

const Home = ({ greeting, meal, currentDate, t }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutChange, setWorkoutChange] = useState(false);
  const [workoutCheck, setWorkoutCheck] = useState(false);
  const { user } = useAuthValue();
  const [intakeChange, setIntakeChange] = useState(false);
  const userData = useFetchUserData(intakeChange);
  const [selectedOption, setSelectedOption] = useState(meal);

  const fetchedWorkouts = useFetchExercises(workoutChange, workoutCheck);
  console.log("Meal Name:", selectedOption);
  useEffect(() => {
    setWorkouts(fetchedWorkouts);
  }, [fetchedWorkouts]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleWorkoutCheck = () => {
    setWorkoutChange((prev) => !prev);
  };

  const handleIntakeChange = (intakeChange) => {
    setIntakeChange((prev) => !prev);
  };

  return (
    <div className="container">
      <Header
        pageType="home"
        currentDate={currentDate}
        timedGreeting={greeting}
        t={t}
      />
      <div className="mainSection">
        <div className={styles.leftSection}>
          <HealthCards t={t} userData={userData} />
          <div className={styles.innerSection}>
            <div className={styles.firstColumn}>
              <div className={`card ${styles.AICoach}`}>
                <div className={styles.titleAndIcon}>
                  <img src={AICoach}></img>
                  <h3 className="title"> {t("AICoach")}</h3>
                </div>
                <AiCoach t={t} userData={userData} timedGreeting={greeting} />
              </div>
            </div>
            <div className={styles.secondColumn}>
              <div className={`card ${styles.todaysWorkouts}`}>
                <h3 className="title">{t("todaysWorkout")}</h3>
                <div className={styles.innerContainer}>
                  <WorkoutList
                    t={t}
                    workouts={workouts}
                    user={user}
                    onCheck={handleWorkoutCheck}
                  />
                </div>
              </div>
              <div className={`card ${styles.friendsInActivity}`}>
                <h3 className="title">{t("friendsInActivity")}</h3>
                <FriendsInActivity t={t} userData={userData} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdColumn}>
          <div className={`mainCard ${styles.dailyIntakes}`}>
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
          <div className={`card ${styles.mealSuggestions}`}>
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
              dailyInfo={userData.dailyInfo}
              meal={selectedOption}
              onChange={handleIntakeChange}
              t={t}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
