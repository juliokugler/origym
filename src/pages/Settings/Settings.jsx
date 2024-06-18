import React, { useState } from 'react';
import styles from './Settings.module.css';
import Header from '../../components/Header/Header';
import classNames from 'classnames';
import useFormData from '../../hooks/useFormData';
import { useUserData } from '../../contexts/UserDataContext';
import UserInfoCard from './UserInfoCard';
import ActivityInfoCard from './ActivityInfoCard';
import PersonalInfoCard from './PersonalInfoCard';

const Settings = ({ t, user, userData }) => {
  const { setUserInfoChange } = useUserData();
  const { handleGoalChange, handleActivityLevelChange } = useFormData(user, userData);



  const handleSubmit = () => {
    // Handle form submission
  };

  if (!userData) {
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

console.log(userData)

  return (
    <div className={classNames('container')}>
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
          <p>Submit Changes</p>
        </button>
      </div>
    </div>
  );
};

export default Settings;