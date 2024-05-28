import React from "react";
import styles from "./NutritionalInfo.module.css";

const NutritionalInfoPopup = ({ data, onClose, unidade, quantidade }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>Informações Nutricionais</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Nome do alimento:</td>
              <td>
                {quantidade} {unidade} de {data.food_name}
              </td>
            </tr>
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
        </table>
        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default NutritionalInfoPopup;
