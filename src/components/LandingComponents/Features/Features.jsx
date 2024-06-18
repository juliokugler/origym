import React from "react";
import styles from "./Features.module.css";
import halteres from "../../../assets/Icons/halteres.png";
import nutrition from "../../../assets/Icons/dieta.png";
import expertCoaches from "../../../assets/Icons/expertCoaches.png";
import progressTracking from "../../../assets/Icons/progressTracking.png";

const Features = () => {
  return (
    <div className={styles.features}>
      <h2>Why Choose <span>Origym</span>?</h2>
      <div className={styles.featureList}>
        <div className={styles.featureItem}>
          <img src={halteres} alt="Personalized Workout Plans" />
          <h3>Personalized Workout Plans</h3>
          <p>Tailored workout plans to fit your goals and fitness level.</p>
        </div>
        <div className={styles.featureItem}>
          <img src={expertCoaches} alt="Expert Coaches" />
          <h3>Expert Coaches</h3>
          <p>Get guidance from certified fitness professionals.</p>
        </div>
        <div className={styles.featureItem}>
          <img src={nutrition} alt="Nutrition Guides" />
          <h3>Nutrition Guides</h3>
          <p>Custom meal plans to complement your fitness routine.</p>
        </div>
        <div className={styles.featureItem}>
          <img src={progressTracking} alt="Progress Tracking" />
          <h3>Progress Tracking</h3>
          <p>Monitor your progress with our advanced tracking tools.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;