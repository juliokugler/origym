import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import styles from "./LoginContainer.module.css";
import { FaGoogle, FaApple, FaCheckSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LoginContainer = () => {
  const { loading, error, handleLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const handleEyeClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h2>{t("welcomeBack")}!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>{t("email")}:</p>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <p>{t("password")}:</p>
            <input
              className={styles.inputField}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <div className={styles.formAddInfo}>
            <div className={styles.nameAndIcon}>
              <FaCheckSquare />
              <p>{t("rememberMe")}</p>{" "}
            </div>
            <p>
              <u>{t("forgotYourPassword")}?</u>
            </p>
          </div>
          
          {!loading && (<div className={styles.buttonContainer}>
            <button className="button"><p>{t("login")}</p></button></div>
          )}
        </form>
        {loading && (
          <div className={styles.buttonContainer}>
          <button className="button" disabled>
           <p> {t("loading")}</p>...
          </button></div>
        )}
        {error && <p className="error">{error}</p>}
        <p className={styles.text}>{t("or")}</p>
      <div className="loginOptions">
        <button className="socialMediaButton">
          <FaGoogle size={22} />
          <p>{t("continueWithGoogle")}</p>
        </button>
        <button className="socialMediaButton">
          <FaApple size={24} />
          <p>{t("continueWithApple")}</p>
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
