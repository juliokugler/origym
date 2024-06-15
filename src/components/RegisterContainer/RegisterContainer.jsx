import styles from "./RegisterContainer.module.css";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useTranslation } from "react-i18next";
import { FaGoogle, FaApple, FaRegEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames";

const RegisterContainer = () => {
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
  const { t } = useTranslation();

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

  // Debounced password match check
  useEffect(() => {
    const handler = setTimeout(() => {
      if (password && confirmPassword && password !== confirmPassword) {
        setError(t("passwordsShouldMatch"));
      } else {
        setError("");
      }
    }, 700); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [password, confirmPassword]);

  // Reset error on typing and check password strength
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
  
    // Length-based scoring
    const lengthScore = password.length >= 6 ? 1 : 0;
    const mediumLengthScore = password.length >= 8 ? 1 : 0;
    const goodLengthScore = password.length >= 10 ? 1 : 0;
    const veryGoodLengthScore = password.length >= 14 ? 1 : 0;
  
    // Character types scoring
    const hasUpperCase = /[A-Z]/.test(password) ? 1 : 0;
    const hasNumber = /[0-9]/.test(password) ? 1 : 0;
    const hasSpecialChar = /[@$!%*?&#]/.test(password) ? 1 : 0;
  
    const criteriaMet = hasUpperCase + hasNumber + hasSpecialChar;
  
    // Calculate strength based on scores
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

  console.log(passwordStrength)

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

  return (
    <div className={styles.registerContainer}>
      <div className={styles.title}>
        <h1>{t("register")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.nameContainer}>
          <label>
            <span>{t("firstName")}:</span>
            <input
              className={styles.nameInputField}
              type="text"
              name="firstName"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
          <label>
            <span>{t("lastName")}:</span>
            <input
              className={styles.nameInputField}
              type="text"
              name="lastName"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>

        <label>
          <span>{t("email")}:</span>
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
          <span>{t("password")}:</span>
          <div className={styles.passwordInputGroup}>
            <input
              className={styles.inputField}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
            <div className={styles.eyeButton} onClick={handleEyeClick}>
              {isPasswordVisible ? (
                <FaEyeSlash aria-label={t("hidePassword")} />
              ) : (
                <FaRegEye aria-label={t("showPassword")} />
              )}
            </div>
          </div>
          {password && (
            <div className={styles.passwordStrength}>
              <span className={styles.strengthText}>
                {t("passwordStrength")}: {passwordStrength}
              </span>
              <div className={styles.progressBar}>
                <div
                  className={classNames(styles.progress, {
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
          <span>{t("confirmPassword")}:</span>
          <div className={styles.passwordInputGroup}>
            <input
              className={styles.inputField}
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              required
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
            <div className={styles.eyeButton} onClick={handleConfirmEyeClick}>
              {isConfirmPasswordVisible ? (
                <FaEyeSlash aria-label={t("hidePassword")} />
              ) : (
                <FaRegEye aria-label={t("showPassword")} />
              )}
            </div>
          </div>
        </label>
        <div className={styles.errorContainer}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        {!loading && (
          <div className={styles.buttonContainer}>
            <button className="button">
              <p>{t("getStarted")}!</p>
            </button>
          </div>
        )}
      </form>
      {loading && (
        <div className={styles.loaderContainer}>
          <div className="loader"></div>
        </div>
      )}

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
    </div>
  );
};

export default RegisterContainer;