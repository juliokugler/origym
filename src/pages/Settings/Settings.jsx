import React, { useState } from 'react';
import styles from './Settings.module.css';
import Header from '../../components/Header/Header';
import classNames from 'classnames';
import useFormData from '../../hooks/useFormData';
import { useUserData } from '../../contexts/UserDataContext';
import UserInfoCard from './UserInfoCard';
import ActivityInfoCard from './ActivityInfoCard';
import PersonalInfoCard from './PersonalInfoCard';

const Settings = ({ t, user }) => {
  const { userData: contextUserData, setUserInfoChange } = useUserData();
  const { userData, setUserData, handleChange, handleGoalChange, handleActivityLevelChange } = useFormData(user, contextUserData);



  const handleSubmit = () => {
    // Handle form submission
  };

  if (!contextUserData) {
    setUserInfoChange(true);
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

console.log(contextUserData)

  return (
    <div className={classNames('container')}>
      <Header t={t} pageType="settings" />
      <div className="mainSection">
        <div className={styles.profileContainer}>
          <div className={styles.column}>
          <UserInfoCard contextUserData={contextUserData}/>
          </div>
          <div className={styles.column}>
            <PersonalInfoCard t={t} contextUserData={contextUserData}/>
          </div>
          <div className={styles.column}>
            <ActivityInfoCard t={t} handleActivityLevelChange={handleActivityLevelChange} handleGoalChange={handleGoalChange} contextUserData={contextUserData}/>
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