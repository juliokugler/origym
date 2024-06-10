import React from "react";
import styles from "./NutritionalInfo.module.css";
import classNames from "classnames"
import NutritionalIntake from "./DailyIntakes/NutritionalIntake";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const NutritionalInfoPopup = ({ data, onClose, unidade, quantidade, mealname, t, userData, dailyInfo, mealImage, onUserInfoChange, user }) => {


  const addMealToDailyInfo = async () => {

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
       <div className={classNames("card", styles.popupContainer)}>       <h2 className={styles.title}>{quantidade} {t`${unidade}`} de {mealname}</h2> <div className={styles.popupContent}>
        <div className={styles.imageContainer}> <img src={mealImage}></img>
          <NutritionalIntake ingredientCalories={data.nf_calories} ingredientProtein={data.nf_protein} ingredientFat={data.nf_total_fat} ingredientCarbs={data.nf_total_carbohydrate} t={t} userData={userData} dailyInfo={dailyInfo}/>
        </div>
       
      <div className={styles.tableContainer}>
 
        <table className={styles.table}>
          <tbody>
                        <tr>
              <td>Calorias:</td>
              <td>{data.nf_calories || "-"}</td>
            </tr>
            <tr>
              <td>Total de gordura (g):</td>
              <td>{data.nf_total_fat || "-"}</td>
            </tr>
            <tr>
              <td>Gordura saturada (g):</td>
              <td>{data.nf_saturated_fat || "-"}</td>
            </tr>
            <tr>
              <td>Colesterol (mg):</td>
              <td>{data.nf_cholesterol || "-"}</td>
            </tr>
            <tr>
              <td>Sódio (mg):</td>
              <td>{data.nf_sodium || "-"}</td>
            </tr>
            <tr>
              <td>Carboidratos totais (g):</td>
              <td>{data.nf_total_carbohydrate || "-"}</td>
            </tr>
            <tr>
              <td>Fibra dietética (g):</td>
              <td>{data.nf_dietary_fiber || "-"}</td>
            </tr>
            <tr>
              <td>Açúcares adicionados (g):</td>
              <td>{data.nf_sugars || "-"}</td>
            </tr>
            <tr>
              <td>Proteína (g):</td>
              <td>{data.nf_protein || "-"}</td>
            </tr>
            <tr>
              <td>Potássio (mg):</td>
              <td>{data.nf_potassium || "-"}</td>
            </tr>
            <tr>
              <td>Fósforo (mg):</td>
              <td>{data.nf_p || "-"}</td>
            </tr>
            <tr>
              <td>Vitamina D (mcg):</td>
              <td>{data.nf_vitamin_d_mcg || "-"}</td>
            </tr>
          </tbody>
        </table></div></div>
        <div className={styles.buttonContainer}>
        <button className="notSelectedButton-medium" onClick={onClose}>{t("close")}</button>
        <button className="button" onClick={addMealToDailyInfo} >{t("addToDailyAndMacros")}
          
        </button>
      </div></div>
    </div>
  );
};

export default NutritionalInfoPopup;
