//React
import React from "react";

//Styles
import styles from "./LandingPage.module.css";

//Page Components
import main from "./components/Hero/hero.png";
import useImageLoad from "../../hooks/useImageLoad";
import Features from "./components/Features/Features";
import Testimonials from "./components/Testimonials/Testimonials";
import Pricing from "./components/Pricing/Pricing";
import Hero from "./components/Hero/Hero";
import Partners from "./components/Partners/Partners";

const LandingPage = ({currentLanguage, isMobile, t}) => {
  const isImageLoaded = useImageLoad(main);

  console.log(isMobile)

  if (!isImageLoaded) {
    return <div className="loader-container"><div className="loader-medium" /></div>;
  }

  return (
    <div className={styles.container}>
  <Hero isMobile={isMobile} t={t} currentLanguage={currentLanguage}/>

     <Partners t={t}  currentLanguage={currentLanguage}/>

      <Features currentLanguage={currentLanguage} />

      <Testimonials currentLanguage={currentLanguage} />

      <Pricing currentLanguage={currentLanguage} />

    </div>
  );
};

export default LandingPage;