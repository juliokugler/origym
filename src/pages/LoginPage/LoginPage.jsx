//React
import React from "react";

//Styles
import styles from "./LoginPage.module.css";

//Assets
import backgroundImage from "../../assets/Images/background.png";

//Components
import LoginContainer from "../../components/Page_Login_Components/LoginContainer";

//Hooks
import useImageLoad from "../../hooks/useImageLoad";

const LoginPage = ({ isMobile, t }) => {
  const isImageLoaded = useImageLoad(backgroundImage);

  if (!isImageLoaded) {
    return (
      <div className="loader-container">
        <div className="loader-medium" />
      </div>
    );
  }

  // Determine background style based on isMobile
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
        <LoginContainer isMobile={isMobile} t={t} />
      </div>
    </div>
  );
};

export default LoginPage;