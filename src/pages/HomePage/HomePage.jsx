//React//
import React, { useState, useEffect } from "react";

//Styles
import styles from "./HomePage.module.css";

//Components
import Header from "../../components/Header/Header";
import HealthCards from "../../components/Home/HealthCards/CardsContainer";
import WorkoutList from "./WorkoutList";
import MealSuggestions from "../../components/Nutrition/MealSuggestions/MealSuggestions";
import FriendsInActivity from "../../components/Home/FriendsInActivity/FriendsInActivity";
import DailyIntakes from "../../components/Nutrition/DailyIntakes/DailyIntakes";

//Media
import AICoach from "../../assets/Icons/AICoach.png";

//Hooks
import useFetchExercises from "../../hooks/useFetchExercises";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";
import AiCoach from "../../components/Home/AICoach/AiCoach";

const Home = ({ greeting, meal, currentDate, t, userData, dailyInfo, user, onUserInfoChange, currentLanguage, isMobile}) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutChange, setWorkoutChange] = useState(false);
  const [workoutCheck, setWorkoutCheck] = useState(false);
  const [intakeChange, setIntakeChange] = useState(false);
  const [selectedOption, setSelectedOption] = useState(meal);

  const fetchedWorkouts = useFetchExercises(workoutChange, workoutCheck);

  useEffect(() => {
    // Set workouts only if fetchedWorkouts is available and userData is not null
    if (fetchedWorkouts.length > 0 && userData !== null) {
      setWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts, userData]);
 if (user && !userData || user && !dailyInfo) {
    return <p>{t("loading")}...</p>;
  }


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleWorkoutCheck = () => {
    setWorkoutChange((prev) => !prev);
  };

 console.log(user)

  return (
    <div className={ !isMobile ? "container" : "container-mobile"}>
      <Header
      isMobile={isMobile}
        pageType="home"
        currentDate={currentDate}
        timedGreeting={greeting}
        t={t}
        userData={userData}
        userUid={user.uid}
        currentLanguage={currentLanguage}
      />{!isMobile? (
      <div className="mainSection">
        <div className={styles.leftSection}>
          <HealthCards t={t} isMobile={isMobile } onUserInfoChange={onUserInfoChange} user={user} userData={userData} dailyInfo={dailyInfo} />
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
                    dailyInfo={dailyInfo}
          onUserInfoChange={onUserInfoChange}
                  />
                </div>
              </div>
              <div className={`card ${styles.friendsInActivity}`}>
                <h3 className="title">{t("friendsInActivity")}</h3>
                <FriendsInActivity t={t} user={user} userData={userData} />
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
              userData={userData}
              dailyInfo={dailyInfo}
            
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
              onUserInfoChange={onUserInfoChange}
              dailyInfo={dailyInfo}
              meal={selectedOption}
              t={t}
              language={currentLanguage}
            />
          </div>
        </div>
      </div>): (<div className="mainSection-mobile"><div className={styles.topContainer_mobile}><HealthCards t={t} isMobile={isMobile} onUserInfoChange={onUserInfoChange} user={user} userData={userData} dailyInfo={dailyInfo} />   <div>
           
            <DailyIntakes
              t={t}
              userData={userData}
              dailyInfo={dailyInfo}
            isMobile={isMobile}
            /></div>
          </div> <div className={`card ${styles.todaysWorkouts_mobile}`}>
                <h3 className={styles.title}>{t("todaysWorkout")}</h3>
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
                  
                </div></div> <div className={`card ${styles.mealSuggestions_mobile}`}>
            <div className={styles.titleAndDropdown_mobile}>
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
              onUserInfoChange={onUserInfoChange}
              dailyInfo={dailyInfo}
              meal={selectedOption}
              t={t}
              language={currentLanguage}
              isMobile={isMobile}
            />
          </div>
              </div>)}
    </div>
  );
};

export default Home;
