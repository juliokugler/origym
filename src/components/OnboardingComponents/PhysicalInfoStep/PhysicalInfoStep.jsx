import React from "react";
import classNames from "classnames";
import styles from "./PhysicalInfoStep.module.css";
import Header from "../Header/Header";

const PhysicalInfoStep = ({ userData, handleChange, handleNext, handleBack, t }) => (
  <>
  <Header t={t}/>
    <div className={classNames("card", styles.step)}>
      <label>
        {t("age")}: *
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={handleChange}
        />
      </label>
      <label>
        {t("height")}: *
        <input
          type="number"
          name="height"
          value={userData.height}
          onChange={handleChange}
        />
      </label>
      <label>
        {t("gender")}: *
        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
        >
          <option value="">{t("select")}...</option>
          <option value="male">{t("male")}</option>
          <option value="female">{t("female")}</option>
          <option value="other">{t("other")}</option>
        </select>
      </label>
      <div className={styles.weightContainer}>
        <label>
          {t("weight")}: *
          <input
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
          />
        </label>
        <label>
          {t("weightGoal")}:
          <input
            type="number"
            name="weightGoal"
            value={userData.weightGoal}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button className="inactiveButton-medium" onClick={handleBack}>
          {t("back")}
        </button>
        <button className="button" onClick={handleNext}>
          {t("next")}
        </button>
      </div>
    </div>
  </>
);

export default PhysicalInfoStep;