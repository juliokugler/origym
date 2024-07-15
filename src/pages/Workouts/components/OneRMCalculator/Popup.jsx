import React from "react";
import styles from "./Popup.module.css";
import classNames from "classnames"

const Popup = ({ results, onClose, t }) => {
  return (
    <div className={styles.overlay}>
      <div className={classNames("card", styles.popup)}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{t("RmResults")}</h2>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>{t("reps")}</th>
              <th>{t("weight")}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.reps}>
                <td>{result.reps}</td>
                <td>{result.value} kgs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Popup;