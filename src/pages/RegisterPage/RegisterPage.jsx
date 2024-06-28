// React
import React from "react";

// Styles
import styles from "./RegisterPage.module.css";

// Components
import RegisterContainer from "../../components/Page_Register_Container/RegisterContainer";

// Hooks
import useImageLoad from "../../hooks/useImageLoad";
import backgroundImage from "../../assets/Images/background.png";

const RegisterPage = ({ isMobile, t }) => {
  const isImageLoaded = useImageLoad(backgroundImage);

  if (!isImageLoaded) {
    return (
      <div className={styles.loaderContainer}>
        <div className="loader-medium" />
      </div>
    );
  }

  const backgroundStyle = isMobile
  ? {
      backgroundColor: "#000000",
      backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0), #242529)"
    }
  : {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

  return (
    <div className={isMobile ? styles.background_mobile : styles.background} style={backgroundStyle}>
      <div className={isMobile ? styles.container_mobile : styles.container}>
        <RegisterContainer isMobile={isMobile} t={t} />
      </div>
    </div>
  );
};

export default RegisterPage;