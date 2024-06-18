import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import styles from "./LoginContainer.module.css";
import { FaGoogle, FaApple, FaCheckSquare, FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LoginContainer = () => {
  const { loading, error, handleLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const handleEyeClick = () => {
    // Check if the password field is autofilled
    const passwordField = document.getElementById('password');
    const isPasswordFieldAutofilled = passwordField.matches(':autofill') || 
      (passwordField.value !== '' && passwordField.value !== password);
  
    // If the password field is autofilled, clear its value
    if (isPasswordFieldAutofilled) {
      setPassword(''); // Clear the password value
    } else {
      // Toggle password visibility only if the password field is not autofilled
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>{t("welcomeBack")}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email"><p>{t("email")}:</p></label>
            <input
              id="email"
              className={styles.inputField}
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              aria-label={t("email")}
            />
          </div>
          <div className={styles.passwordInputGroup}>
            <label htmlFor="password"><p>{t("password")}:</p></label>
            <input
              id="password"
              className={styles.inputField}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              aria-label={t("password")}
            />
          <div className={styles.eyeButton} onClick={handleEyeClick}>
  {isPasswordVisible ? (
    <FaEyeSlash aria-label={t("hidePassword")} />
  ) : (
    <FaRegEye aria-label={t("showPassword")} />
  )}
</div>
          </div>
          <div className={styles.formAddInfo}>
            <div className={styles.nameAndIcon}>
              <FaCheckSquare aria-hidden="true" />
              <p>{t("rememberMe")}</p>{" "}
            </div>
            <p>
              <u>{t("forgotYourPassword")}?</u>
            </p>
          </div>
          
          <div className={styles.buttonContainer}>
            {loading ? (
         <button disabled className="inactiveButton-medium">
         <div className="loader"></div>
       </button>): (
            <button className="button" >
              <p>{t("getStarted")}!</p>
            </button>
         )}
        </div>
        </form>
       
        {error && <p className="error">{error}</p>}
        <p className={styles.text}>{t("or")}</p>
        <div className="loginOptions">
          <button className="socialMediaButton">
            <FaGoogle size={22} />
            <span>{t("continueWithGoogle")}</span>
          </button>
          <button className="socialMediaButton">
            <FaApple size={24} />
            <span>{t("continueWithApple")}</span>
          </button>
        </div>
        <div className={styles.text}>
          <p>
            {t("noAccount")}? <a href="/register">{t("signUp")}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;