//React
import React, { useState } from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";

//Style
import "./index.css";

//Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

//Hooks
import { useAuth } from "./hooks/useAuth";
import { useTranslations } from "./hooks/useTranslations";
import { useTranslation } from "react-i18next";
import { useGreetingAndMeal } from "./hooks/useGreetingAndMeal";
import { AuthProvider, useAuthValue } from "./contexts/AuthContext";
import { UserDataProvider, useUserData } from "./contexts/UserDataContext";

//Pages 
import Health from "./pages/HealthPage/HealthPage";
import NutritionPage from "./pages/NutritionPage/NutritionPage";
import Home from "./pages/HomePage/HomePage";
import Landing from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/LoginPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Workouts from "./pages/WorkoutsPage/WorkoutsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Friends from "./pages/FriendsPage/FriendsPage";
import Onboarding from "./pages/Onboarding/Onboarding";

function AppContent() {
  const { userData, dailyInfo, loading, setUserInfoChange } = useUserData();
  const { switchLanguage } = useTranslations();
  const { greeting, meal, mealNumber, currentDate } = useGreetingAndMeal();
  const { t } = useTranslation();
  const {user} = useAuthValue()

  if (loading) {
    return <p>{t("loading")}...</p>;
  }
  console.log("data:", userData)
  
  const handleUserInfoChange = () => {
    setUserInfoChange((prev) => !prev);
  };

  return (
    <div className="App">
      {!user? <Navbar t={t} /> : <Sidebar />}
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={!userData ? <Landing t={t} /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!userData ? <Login t={t} /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={
             userData ? (
                <Home
                  t={t}
                  user={user}
                  greeting={greeting}
                  meal={meal}
                  currentDate={currentDate}
                  userData={userData}
                  dailyInfo={dailyInfo}
                  onUserInfoChange={handleUserInfoChange}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/workouts" element={userData ? <Workouts userData={userData} dailyInfo={dailyInfo} t={t} /> : <Navigate to="/login" />} />
          <Route path="/health" element={userData ? <Health userData={userData} t={t} /> : <Navigate to="/login" /> } />
          <Route
            path="/nutrition"
            element={userData ? 
              <NutritionPage
                onUserInfoChange={handleUserInfoChange}
                t={t}
                userData={userData}
                dailyInfo={dailyInfo}
                meal={meal}
                mealNumber={mealNumber}
                user={user}
              /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={userData ? <ProfilePage user={user} onUserInfoChange={handleUserInfoChange} userData={userData.userProfile} dailyInfo={userData.dailyInfo} t={t} /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!userData ? <RegisterPage t={t} /> : <Navigate to="/home" />}
          />
          <Route
            path="/friends"
            element={userData ? <Friends user={user} userData={userData} t={t} /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={
              user ? (
                <Onboarding onUserInfoChange={handleUserInfoChange} switchLanguage={switchLanguage} userInfo={userData}   user={user} userUid={user.uid} t={t}/>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              user ? <Onboarding onUserInfoChange={handleUserInfoChange} switchLanguage={switchLanguage} userInfo={userData}   user={user} userUid={user.uid} t={t} /> : <Navigate to="/login" />
            }
          />
          <Route path="/profile/:userId" element={<ProfilePage user={user} userData={userData} t={t} />} />
        </Routes>
        <Footer t={t} />
      </div>
    </div>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthProvider value={{ user }}>
      <UserDataProvider user={user}>

          <AppContent />
      
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;