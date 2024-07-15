//React
import React from 'react';

//Styles
import styles from './Settings.module.css';

//Components
import Header from '../../components/Header/Header';

//Hooks
import useFormData from '../../hooks/useFormData';

//Contexts
import { useUserData } from '../../contexts/UserDataContext';

//Page Components
import UserInfoCard from './UserInfoCard';
import ActivityInfoCard from './ActivityInfoCard';
import PersonalInfoCard from './PersonalInfoCard';

const Settings = ({ t, user, userData, isMobile }) => {
  const { setUserInfoChange } = useUserData();
  const { handleGoalChange, handleActivityLevelChange } = useFormData(user, userData);

  const handleSubmit = () => {
  };

  if (!userData) {
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

  return (
    <div className={ !isMobile ? "container" : "container-mobile"}>
      <Header userData={userData} t={t} pageType="settings" />
      <div className="mainSection">
        <div className={styles.profileContainer}>
          <div className={styles.column}>
          <UserInfoCard userData={userData}/>
          </div>
          <div className={styles.column}>
            <PersonalInfoCard t={t} userData={userData}/>
          </div>
          <div className={styles.column}>
            <ActivityInfoCard t={t} handleActivityLevelChange={handleActivityLevelChange} handleGoalChange={handleGoalChange} userData={userData}/>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className="button" onClick={handleSubmit}>
          <p>{t("submitChanges")}</p>
        </button>
      </div>
    </div>
  );
};

export default Settings;