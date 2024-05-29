//React
import React, { useState } from "react";


//Styles
import styles from "./RegisterPage.module.css";

//Components
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";

//Media
import backgroundImage from "../../assets/Images/background.png";

const RegisterPage = () => {



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
