import React from "react";
import styles from "./LandingPage.module.css";
import main from "./hero.png";
import partners from "../../assets/Icons/partners.png";
import useImageLoad from "../../hooks/useImageLoad";
import Features from "../../components/LandingComponents/Features/Features";
import Testimonials from "../../components/LandingComponents/Testimonials/Testimonials";
import Pricing from "../../components/LandingComponents/Pricing/Pricing";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const LandingPage = (currentLanguage, isMobile) => {
  const isImageLoaded = useImageLoad(main);

  console.log(currentLanguage)

const navigate = useNavigate()
  if (!isImageLoaded) {
    return <div className="loader-container"><div className="loader-medium" /></div>;
  }

  return (
    <div className={styles.container}>
  <Hero isMobile={isMobile} currentLanguage={currentLanguage.currentLanguage}/>

      <div className={styles.partners}>
        <div className={styles.partnersInfo}>
          <h2>They trust us</h2>
        </div>
        <img src={partners} alt="Partners" />
      </div>

      <Features currentLanguage={currentLanguage.currentLanguage} />

      <Testimonials currentLanguage={currentLanguage.currentLanguage} />

      <Pricing currentLanguage={currentLanguage.currentLanguage} />

    </div>
  );
};

export default LandingPage;