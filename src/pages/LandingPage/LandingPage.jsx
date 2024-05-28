import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import main from "./newHero.png";
import main2 from "./hero2.png";
import partners from "./partners.png";
import halteres from "./halteres.png";
import nutrition from "./dieta.png";
import health from "./health.png";
import smartwatch from "./smartwatch.png";
import sleep from "./sleep.png";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img src={main}></img>
        <button className={styles.button}>
          <h3>Join Now</h3>
        </button>
      </div>

      {/*Partners*/}
      <div className={styles.partners}>
        <div className={styles.partnersInfo}>
          <h2>They trust us</h2>
        </div>
        <img src={partners}></img>
      </div>

      {/*Banner*/}
      <div className={styles.container2}>
        <div className={styles.hero2}>
          <img src={main2} alt="Fitness Image" />
        </div>
        <div className={styles.heroAndInfo2}>
          {" "}
          <h1>
            <span>STAY ON BEAT</span>.
            <br />
            CONNECT YOUR <span>SMARTWATCH</span>
            <br />
            EFFORTLESSLY.
          </h1>
          <p>Seamless smartwatch integration to keep you on the move.</p>
          <button className={styles.cta2}>
            <h3>Try it Now</h3>
          </button>
        </div>{" "}
      </div>

      {/*Cards*/}

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2>Exercises</h2>
          <img className={styles.icon2} src={halteres}></img>
        </div>
        <div className={styles.card}>
          {" "}
          <h2>Nutrition</h2>
          <img className={styles.icon2} src={nutrition}></img>
        </div>
        <div className={styles.card}>
          <h2>Health</h2>
          <img className={styles.icon} src={health}></img>
        </div>
        <div className={styles.card}>
          <h2>Smart Tracking</h2>
          <img className={styles.icon} src={smartwatch}></img>
        </div>
        <div className={styles.card}>
          <h2>Sleep</h2>
          <img className={styles.icon} src={sleep}></img>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
