// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Styles
import "./App.css";
import "./index.css"; // Make sure to include your index.css

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useTranslations } from "./hooks/useTranslations";
import { useTranslation } from "react-i18next";
import { useGreetingAndMeal } from "./hooks/useGreetingAndMeal";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Health from "./pages/HealthPage/HealthPage";
import NutritionPage from "./pages/NutritionPage/NutritionPage";
import Home from "./pages/HomePage/HomePage";
import Landing from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/LoginPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Workouts from "./pages/WorkoutsPage/WorkoutsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProfile from "./pages/FriendProfilePage/FriendProfilePage";
import AdditionalInfo from "./pages/AdditionalInfoPage/AdditionalInfoPage";
import Friends from "./pages/FriendsPage/FriendsPage";

function App() {
  const { user, loading } = useAuth();
  const { switchLanguage } = useTranslations();
  const { greeting, meal, mealNumber, currentDate } = useGreetingAndMeal();
  const { t } = useTranslation();

  if (loading) {
    return <p>{t("loading")}...</p>;
  }

  return (
    <AuthProvider value={{ user }}>
      <div className="App">
        {!user ? <Navbar t={t} /> : <Sidebar />}
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={!user ? <Landing t={t} /> : <Navigate to="/home" />}
            />
            <Route
              path="/login"
              element={!user ? <Login t={t} /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={
                user ? (
                  <Home
                    t={t}
                    greeting={greeting}
                    meal={meal}
                    currentDate={currentDate}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/workouts" element={<Workouts t={t} user={user} />} />
            <Route path="/health" element={<Health t={t} />} />
            <Route
              path="/nutrition"
              element={
                <NutritionPage t={t} meal={meal} mealNumber={mealNumber} />
              }
            />
            <Route
              path="/profile"
              element={user ? <ProfilePage t={t} /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!user ? <RegisterPage t={t} /> : <Navigate to="/home" />}
            />
            <Route
              path="/friends"
              element={user ? <Friends t={t} /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={
                user ? (
                  <SettingsPage t={t} switchLanguage={switchLanguage} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/additionalinfo"
              element={
                user ? <AdditionalInfo t={t} /> : <Navigate to="/login" />
              }
            />
            <Route path="/profile/:userId" element={<UserProfile t={t} />} />
          </Routes>
          <Footer t={t} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
