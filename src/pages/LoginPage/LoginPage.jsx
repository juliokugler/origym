import React from "react";

// Styles
import styles from "./LoginPage.module.css";

// Components
import LoginContainer from "../../components/LoginContainer/LoginContainer";

// Hooks
import useImageLoad from "../../hooks/useImageLoad";
import backgroundImage from "../../assets/Images/background.png";

const LoginPage = () => {
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
        <LoginContainer />
      </div>
    </div>
  );
};

export default LoginPage;