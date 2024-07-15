// React
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./RegisterContainer.module.css";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { FaGoogle, FaApple, FaRegEye, FaEyeSlash } from "react-icons/fa";

const RegisterContainer = ({ isMobile, t }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();

  const handleEyeClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleConfirmEyeClick = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      firstName,
      lastName,
      email,
      password,
      photoURL,
    };

    if (password !== confirmPassword) {
      setError(t("passwordsShouldMatch"));
      return;
    }

    try {
      await createUser(user);
    } catch (error) {
      setError(error.message || t("errorTryAgainLater"));
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (password && confirmPassword && password !== confirmPassword) {
        setError(t("passwordsShouldMatch"));
      } else {
        setError("");
      }
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [password, confirmPassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
    checkPasswordStrength(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const checkPasswordStrength = (password) => {
    let strength = "";

    const lengthScore = password.length >= 6 ? 1 : 0;
    const mediumLengthScore = password.length >= 8 ? 1 : 0;
    const goodLengthScore = password.length >= 10 ? 1 : 0;
    const veryGoodLengthScore = password.length >= 14 ? 1 : 0;

    const hasUpperCase = /[A-Z]/.test(password) ? 1 : 0;
    const hasNumber = /[0-9]/.test(password) ? 1 : 0;
    const hasSpecialChar = /[@$!%*?&#]/.test(password) ? 1 : 0;

    const criteriaMet = hasUpperCase + hasNumber + hasSpecialChar;

    if (password.length < 6) {
      strength = t("weak");
    } else if (lengthScore && criteriaMet === 1) {
      strength = t("medium");
    } else if (mediumLengthScore && criteriaMet === 2) {
      strength = t("good");
    } else if (goodLengthScore && criteriaMet >= 2) {
      strength = t("strong");
    } else if (veryGoodLengthScore && criteriaMet >= 1) {
      strength = t("strong");
    } else {
      strength = t("medium");
    }

    setPasswordStrength(strength);
  };

  const getStrengthPercentage = () => {
    switch (passwordStrength) {
      case t("weak"):
        return 25;
      case t("medium"):
        return 50;
      case t("good"):
        return 75;
      case t("strong"):
        return 100;
      default:
        return 0;
    }
  };

  const handleFirstNameChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^a-zA-Z]/g, "");
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^a-zA-Z]/g, "");
    setLastName(value);
  };

  return (
    <div className={isMobile ? styles.registerContainer_mobile : styles.registerContainer}>
      <div className={isMobile ? styles.title_mobile : styles.title}>
        <h1>{t("register")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={isMobile ? styles.nameContainer_mobile : styles.nameContainer}>
          <label>
            <p>{t("firstName")}:</p>
            <input
              className={isMobile ? styles.nameInputField_mobile : styles.nameInputField}
              type="text"
              name="firstName"
              required
              onChange={handleFirstNameChange}
              value={firstName}
            />
          </label>
          <label>
            <p>{t("lastName")}:</p>
            <input
              className={isMobile ? styles.nameInputField_mobile : styles.nameInputField}
              type="text"
              name="lastName"
              required
              onChange={handleLastNameChange}
              value={lastName}
            />
          </label>
        </div>

        <label>
          <p>{t("email")}:</p>
          <input
            className={isMobile ? styles.inputField_mobile : styles.inputField}
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <p>{t("password")}:</p>
          <div className={isMobile ? styles.passwordInputGroup_mobile : styles.passwordInputGroup}>
            <input
              className={isMobile ? styles.inputField_mobile : styles.inputField}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={handlePasswordChange}
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
          {password && (
            <div className={isMobile ? styles.passwordStrength_mobile : styles.passwordStrength}>
              <span className={isMobile ? styles.strengthText_mobile : styles.strengthText}>
                {t("passwordStrength")}: {passwordStrength}
              </span>
              <div className={isMobile ? styles.progressBar_mobile : styles.progressBar}>
                <div
                  className={classNames(isMobile ? styles.progress_mobile : styles.progress, {
                    [styles.weak]: passwordStrength === t("weak"),
                    [styles.medium]: passwordStrength === t("medium"),
                    [styles.good]: passwordStrength === t("good"),
                    [styles.strong]: passwordStrength === t("strong"),
                  })}
                  style={{ width: `${getStrengthPercentage()}%` }}
                ></div>
              </div>
            </div>
          )}
        </label>

        <label>
          <p>{t("confirmPassword")}:</p>
          <div className={isMobile ? styles.passwordInputGroup_mobile : styles.passwordInputGroup}>
            <input
              className={isMobile ? styles.inputField_mobile : styles.inputField}
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              required
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
            <div className={isMobile ? styles.eyeButton_mobile : styles.eyeButton} onClick={handleConfirmEyeClick}>
              {isConfirmPasswordVisible ? (
                <FaEyeSlash aria-label={t("hidePassword")} />
              ) : (
                <FaRegEye aria-label={t("showPassword")} />
              )}
            </div>
          </div>
        </label>
        <div className={isMobile ? styles.errorContainer_mobile : styles.errorContainer}>
          {error && <p className={isMobile ? styles.error_mobile : styles.error}>{error}</p>}
        </div>

        <div className={isMobile ? styles.buttonContainer_mobile : styles.buttonContainer}>
          {loading ? (
            <button disabled className={isMobile ? "inactiveButton-medium_mobile" : "inactiveButton-medium"}>
              <div className="loader"></div>
            </button>
          ) : (
            <button className={isMobile ? "button_mobile" : "button"}>
              <p>{t("getStarted")}!</p>
            </button>
          )}
        </div>
      </form>

      <p className={isMobile ? styles.text_mobile : styles.text}>{t("or")}</p>
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
    </div>
  );
};

export default RegisterContainer;
