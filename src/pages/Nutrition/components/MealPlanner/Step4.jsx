//React
import React from "react";

//Styles
import styles from "./Step4.module.css";

const Step4 = ({ onCreate }) => {
  return (
    <div className={styles.container}>
      <h2>Recipe Successfully Added</h2>
      <button className={styles.createButton} onClick={onCreate}>
        Add Another Recipe
      </button>
      <button className={styles.shareButton}>
        Share with Friends
      </button>
    </div>
  );
};

export default Step4;