//React
import React, { useState } from "react";


//Styles
import styles from "./RegisterPage.module.css";

//Components
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";

// Hooks
import useImageLoad from "../../hooks/useImageLoad";
import backgroundImage from "../../assets/Images/background.png";

const RegisterPage = () => {
  const isImageLoaded = useImageLoad(backgroundImage);

  if (!isImageLoaded) {
    return <div className="loader-container"><div className="loader-medium"/></div>;
  }
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.container}>
       <RegisterContainer />
     
      </div>
    </div>
  );
};

export default RegisterPage;
