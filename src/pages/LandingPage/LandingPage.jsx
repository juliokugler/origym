import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import main from "./newHero.png";
import main2 from "./hero2.png";
import partners from "../../assets/Icons/partners.png";
import halteres from "../../assets/Icons/halteres.png";
import nutrition from "../../assets/Icons/dieta.png";
import health from "../../assets/Icons/health.png"
import smartwatch from "../../assets/Icons/smartwatch.png";
import sleep from "./sleep.png";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
      <h1>
            START YOUR <span>FITNESS</span> 
            <br />
            <span>JOURNEY</span> NOW
            <br />
            WITH <span>ORIGYM</span>.
          </h1>
          <p>Track your workouts, nutrition, sleep and much <br/> more!</p>
          <button className="button">
          <h3>Join Now</h3>
        </button></div>
      </div>

      {/*Partners*/}
      <div className={styles.partners}>
        <div className={styles.partnersInfo}>
          <h2>They trust us</h2>
        </div>
        <img src={partners}></img>
      </div>

      {/*Banner*/}
      <div className={styles.banner}>
        <div className={styles.bannerImage}/>
        
        <div className={styles.bannerText}>
                <h1>
            <span>STAY ON BEAT</span>.
            <br />
            CONNECT YOUR <span>SMARTWATCH</span>
            <br />
            EFFORTLESSLY.
          </h1>
          <p>Seamless smartwatch integration to keep you on the move.</p>
          <button className="button">
            <h3>Try it Now</h3>
          </button>
        </div>{" "}
      </div>

      {/*Cards*/}

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2>Exercises</h2>
          <img className={styles.icon} src={halteres}></img>
        </div>
        <div className={styles.card}>
          {" "}
          <h2>Nutrition</h2>
          <img className={styles.icon} src={nutrition}></img>
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
