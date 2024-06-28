import React from "react";
import styles from "./LandingPage.module.css";
import main from "../../components/Page_Landing_Components/Hero/hero.png";
import partners from "../../assets/Icons/partners.png";
import useImageLoad from "../../hooks/useImageLoad";
import Features from "../../components/Page_Landing_Components/Features/Features";
import Testimonials from "../../components/Page_Landing_Components/Testimonials/Testimonials";
import Pricing from "../../components/Page_Landing_Components/Pricing/Pricing";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Page_Landing_Components/Hero/Hero";

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