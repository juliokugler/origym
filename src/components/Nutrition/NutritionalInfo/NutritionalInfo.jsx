import React from "react";
import styles from "./NutritionalInfo.module.css";
import classNames from "classnames"
import NutritionalIntake from "./DailyIntakes/NutritionalIntake";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const NutritionalInfoPopup = ({ data, onClose, unidade, quantidade, ingredientname, t, userData, dailyInfo, ingredientImage, onUserInfoChange, user }) => {

  const addIngredientToDailyInfo = async () => {
    const db = getFirestore();
    const currentDate = new Date().toISOString().slice(0, 10);
    const dailyInfoRef = doc(db, `users/${user.uid}/dailyInfo/${currentDate}`);

    try {
      await setDoc(
        dailyInfoRef,
        {
          caloriesConsumed: dailyInfo.caloriesConsumed + data.nf_calories,
          proteinConsumed: dailyInfo.proteinConsumed + data.nf_protein,
          fatConsumed: dailyInfo.fatConsumed + data.nf_total_fat,
          carbsConsumed: dailyInfo.carbsConsumed + data.nf_total_carbohydrate,
        },
        { merge: true }
      );

      console.log("Nutritional values added successfully.");
      onUserInfoChange();
    } catch (error) {
      console.error("Error adding nutritional values:", error);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={classNames("card", styles.popupContainer)}>
        <h2 className={styles.title}>{quantidade} {t(`${unidade}`)} of {ingredientname}</h2>
        <div className={styles.popupContent}>
          <div className={styles.imageContainer}>
            <img src={ingredientImage} alt="Ingredient"></img>
            <NutritionalIntake
              ingredientCalories={data.nf_calories}
              ingredientProtein={data.nf_protein}
              ingredientFat={data.nf_total_fat}
              ingredientCarbs={data.nf_total_carbohydrate}
              t={t}
              userData={userData}
              dailyInfo={dailyInfo}
            />
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>{t("calories")}:</td>
                  <td>{data.nf_calories || "-"}</td>
                </tr>
                <tr>
                  <td>{t("totalFat")} (g):</td>
                  <td>{data.nf_total_fat || "-"}</td>
                </tr>
                <tr>
                  <td>{t("saturatedFat")} (g):</td>
                  <td>{data.nf_saturated_fat || "-"}</td>
                </tr>
                <tr>
                  <td>{t("cholesterol")} (mg):</td>
                  <td>{data.nf_cholesterol || "-"}</td>
                </tr>
                <tr>
                  <td>{t("sodium")} (mg):</td>
                  <td>{data.nf_sodium || "-"}</td>
                </tr>
                <tr>
                  <td>{t("totalCarbohydrates")} (g):</td>
                  <td>{data.nf_total_carbohydrate || "-"}</td>
                </tr>
                <tr>
                  <td>{t("dietaryFiber")} (g):</td>
                  <td>{data.nf_dietary_fiber || "-"}</td>
                </tr>
                <tr>
                  <td>{t("addedSugars")} (g):</td>
                  <td>{data.nf_sugars || "-"}</td>
                </tr>
                <tr>
                  <td>{t("protein")} (g):</td>
                  <td>{data.nf_protein || "-"}</td>
                </tr>
                <tr>
                  <td>{t("potassium")} (mg):</td>
                  <td>{data.nf_potassium || "-"}</td>
                </tr>
                <tr>
                  <td>{t("phosphorus")} (mg):</td>
                  <td>{data.nf_p || "-"}</td>
                </tr>
                <tr>
                  <td>{t("vitaminD")} (mcg):</td>
                  <td>{data.nf_vitamin_d_mcg || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className="notSelectedButton-medium" onClick={onClose}>{t("close")}</button>
          <button className="button" onClick={addIngredientToDailyInfo}>{t("addToDailyAndMacros")}</button>
        </div>
      </div>
    </div>
  );
};

export default NutritionalInfoPopup;