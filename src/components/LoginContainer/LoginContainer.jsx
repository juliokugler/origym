import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import styles from "./LoginContainer.module.css";
import { FaGoogle, FaApple, FaCheckSquare, FaRegEye, FaEyeSlash } from "react-icons/fa";

const LoginContainer = ({ isMobile, t }) => {
  const { loading, error, handleLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEyeClick = () => {
    const passwordField = document.getElementById('password');
    const isPasswordFieldAutofilled = passwordField.matches(':autofill') || 
      (passwordField.value !== '' && passwordField.value !== password);
  
    if (isPasswordFieldAutofilled) {
      setPassword('');
    } else {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={isMobile ? styles.loginContainer_mobile : styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>{t("welcomeBack")}</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className={isMobile ? styles.nameContainer_mobile : styles.nameContainer}>
            <label htmlFor="email">
              <p>{t("email")}:</p>
              <input
                id="email"
                className={!isMobile ? styles.inputField : styles.inputField_mobile}
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-label={t("email")}
              />
            </label>
          </div>
          <div className={isMobile ? styles.nameContainer_mobile : styles.nameContainer}>
            <label htmlFor="password">
              <p>{t("password")}:</p>
              <div className={isMobile ? styles.passwordInputGroup_mobile : styles.passwordInputGroup}>
            <input
              className={isMobile ? styles.inputField_mobile : styles.inputField}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className={isMobile ? styles.eyeButton_mobile : styles.eyeButton} onClick={handleEyeClick}>
              {isPasswordVisible ? (
                <FaEyeSlash aria-label={t("hidePassword")} />
              ) : (
                <FaRegEye aria-label={t("showPassword")} />
              )}
            </div>
          </div>
            </label>
          </div>
          <div className={isMobile ? styles.formAddInfo_mobile : styles.formAddInfo}>
            <div className={styles.nameAndIcon}>
              <FaCheckSquare aria-hidden="true" />
              <p>{t("rememberMe")}</p>
            </div>
            <p>
              <u>{t("forgotYourPassword")}?</u>
            </p>
          </div>
          <div className={isMobile ? styles.buttonContainer_mobile : styles.buttonContainer}>
            {loading ? (
              <button disabled className={isMobile ? "inactiveButton-medium_mobile" : "inactiveButton-medium"}>
                <div className="loader"></div>
              </button>
            ) : (
              <button className={isMobile ? "button_mobile" : "button"}>
                <p>{t("login")}!</p>
              </button>
            )}
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        <p className={!isMobile ? styles.text : styles.text_mobile}>{t("or")}</p>
        <div className={isMobile ? "loginOptions_mobile" : "loginOptions"}>
          <button className={isMobile ? "socialMediaButton_mobile" : "socialMediaButton"}>
            <FaGoogle size={22} />
            <p>{t("continueWithGoogle")}</p>
          </button>
          <button className={isMobile ? "socialMediaButton_mobile" : "socialMediaButton"}>
            <FaApple size={24} />
            <p>{t("continueWithApple")}</p>
          </button>
        </div>
        <div>
        <p className={!isMobile ? styles.text : styles.text2_mobile}>
            {t("noAccount")}? <a href="/register">{t("signUp")}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;