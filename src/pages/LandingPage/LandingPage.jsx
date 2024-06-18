import React from "react";
import styles from "./LandingPage.module.css";
import main from "./hero.png";
import partners from "../../assets/Icons/partners.png";
import useImageLoad from "../../hooks/useImageLoad";
import Features from "../../components/LandingComponents/Features/Features";
import Testimonials from "../../components/LandingComponents/Testimonials/Testimonials";
import Pricing from "../../components/LandingComponents/Pricing/Pricing";

const LandingPage = () => {
  const isImageLoaded = useImageLoad(main);

  if (!isImageLoaded) {
    return <div className="loader-container"><div className="loader-medium" /></div>;
  }

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
          <p>Track your workouts, nutrition, sleep and much <br /> more!</p>
          <button className="button">
            <h3>Join Now</h3>
          </button>
        </div>
      </div>

      {/* Partners */}
      <div className={styles.partners}>
        <div className={styles.partnersInfo}>
          <h2>They trust us</h2>
        </div>
        <img src={partners} alt="Partners" />
      </div>

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <Testimonials />


      {/* Pricing */}
      <Pricing />
    </div>
  );
};

export default LandingPage;