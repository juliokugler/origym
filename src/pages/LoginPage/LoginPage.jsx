//React
import React from "react";

//Styles
import styles from "./LoginPage.module.css";

//Components
import LoginContainer from "../../components/Login/LoginContainer";

//Hooks
import useBackgroundImage from "../../hooks/useBackgroundImage";
import backgroundImage from "../../assets/Images/background.png";

const LoginPage = () => {
  const backgroundImageUrl = useBackgroundImage({ backgroundImage });
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
