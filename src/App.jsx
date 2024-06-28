//React
import React from "react";

//Styles
import "./index.css";

//Navigation
import Navbar from "./components/Nav_Navbar/Navbar";
import MobileNavbar from "./components/Nav_Mobile/MobileNavbar";
import Sidebar from "./components/Nav_Sidebar/Sidebar";

//Hooks
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useTranslations } from "./hooks/useTranslations";
import { useTranslation } from "react-i18next";
import { useGreetingAndMeal } from "./hooks/useGreetingAndMeal";
import useIsMobile from "./hooks/useIsMobile";

//Contexts
import { AuthProvider, useAuthValue } from "./contexts/AuthContext";
import { UserDataProvider, useUserData } from "./contexts/UserDataContext";

//Components
import Footer from "./components/Footer/Footer";

//Pages
import Health from "./pages/HealthPage/HealthPage";
import NutritionPage from "./pages/NutritionPage/NutritionPage";
import Home from "./pages/HomePage/HomePage";
import Landing from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/LoginPage";
import Workouts from "./pages/WorkoutsPage/WorkoutsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Friends from "./pages/FriendsPage/FriendsPage";
import Onboarding from "./pages/Onboarding/Onboarding";
import Settings from "./pages/Settings/Settings";

function AppContent() {
  const { userData, dailyInfo, loading, setUserInfoChange } = useUserData();
  const { user } = useAuthValue();
  const { switchLanguage, currentLanguage } = useTranslations(user);
  const { t } = useTranslation();
  const { greeting, meal, mealNumber, currentDate } = useGreetingAndMeal(currentLanguage, t, switchLanguage);
  const isMobile = useIsMobile();

  if (loading) {
    return <p>{t("loading")}...</p>;
  }

  const handleUserInfoChange = () => {
    setUserInfoChange((prev) => !prev);
  };

  return (
    <div className="App">
      {!user ? <Navbar t={t} currentLanguage={currentLanguage} user={user} /> : isMobile ? "" : <Sidebar />}
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={!userData ? <Landing isMobile={isMobile} currentLanguage={currentLanguage} /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!userData ? <Login t={t} isMobile={isMobile} currentLanguage={currentLanguage} /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={
              userData && user ? (
                <Home
                  t={t}
                  user={user}
                  greeting={greeting}
                  meal={meal}
                  currentDate={currentDate}
                  userData={userData}
                  dailyInfo={dailyInfo}
                  onUserInfoChange={handleUserInfoChange}
                  currentLanguage={currentLanguage}
                  isMobile={isMobile}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/workouts"
            element={userData ? <Workouts user={user} isMobile={isMobile} userData={userData} dailyInfo={dailyInfo} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/login" />}
          />
          <Route
            path="/health"
            element={userData ? <Health isMobile={isMobile} userData={userData} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/login" />}
          />
          <Route
            path="/nutrition"
            element={userData && user ? 
              <NutritionPage
              isMobile={isMobile}
                onUserInfoChange={handleUserInfoChange}
                t={t}
                userData={userData}
                dailyInfo={dailyInfo}
                meal={meal}
                mealNumber={mealNumber}
                user={user}
                currentLanguage={currentLanguage}
              /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={userData && user ? <ProfilePage isMobile={isMobile} user={user} onUserInfoChange={handleUserInfoChange} userData={userData} dailyInfo={dailyInfo} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!userData ? <RegisterPage isMobile={isMobile} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/home" />}
          />
          <Route
            path="/friends"
            element={userData ? <Friends isMobile={isMobile} user={user} userData={userData} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={
              user ? (
                <Settings onUserInfoChange={handleUserInfoChange} isMobile={isMobile} switchLanguage={switchLanguage} userData={userData} user={user} userUid={user.uid} t={t} currentLanguage={currentLanguage} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              user ? <Onboarding isMobile={isMobile}  onUserInfoChange={handleUserInfoChange} switchLanguage={switchLanguage} userInfo={userData} user={user} userUid={user.uid} t={t} currentLanguage={currentLanguage} /> : <Navigate to="/login" />
            }
          />
          <Route path="/profile/:userId" element={<ProfilePage isMobile={isMobile} user={user} userData={userData} t={t} currentLanguage={currentLanguage} onUserInfoChange={handleUserInfoChange} />} />
        </Routes>
        <Footer t={t} />
      </div>
      {user && isMobile && <MobileNavbar/>}
    </div>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loader-container"><div className="loader"/></div>;
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