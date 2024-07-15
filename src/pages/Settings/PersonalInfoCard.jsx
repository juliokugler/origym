//React
import React, {useState} from 'react'

//Styles
import styles from "./Settings.module.css"

//Dependencies
import classNames from 'classnames';

const PersonalInfoCard = ({userData, t}) => {
  const [gender, setGender] = useState(userData.userProfile.gender)
  const [age, setAge] = useState(userData.userProfile.age);
  const [height, setHeight] = useState(userData.userProfile.height);
  const [weight, setWeight] = useState(userData.userProfile.weight);
  const [weightGoal, setWeightGoal] = useState(userData.userProfile.weightGoal);

      if (!userData) {
      ;
        return (
          <div className="loader-container">
            <div className="loader-medium" />
          </div>
        );
      }

    console.log(userData)
  return (
    <div className={classNames('card', styles.personalInfoContainer)}>
    <h3>Personal Information</h3>
    <div className={styles.inputGroup}>
      <label>{t('gender')}:</label>
      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">{t('select')}...</option>
        <option value="male">{t('male')}</option>
        <option value="female">{t('female')}</option>
        <option value="other">{t('other')}</option>
      </select>
    </div>
    <div className={styles.inputGroup}>
      <label>{t('age')}</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </div>
    <div className={styles.inputGroup}>
      <label>{t('height')}</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
    </div>
    <div className={styles.inputGroup}>
      <label>{t('weight')}</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
    </div>
    <div className={styles.inputGroup}>
      <label>{t('weightGoal')}</label>
      <input
        type="number"
        value={weightGoal}
        onChange={(e) => setWeightGoal(e.target.value)}
      />
    </div>
  </div>
  
  )
}

export default PersonalInfoCard;