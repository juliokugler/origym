import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useTranslation } from "react-i18next";
import { FaGoogle, FaApple } from "react-icons/fa";

const RegisterContainer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
  );
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();
  const { t } = useTranslation();
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
      setError("As senhas precisam ser iguais.");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.registerContainer}>
      <div className={styles.title}>
        <h2>{t("register")}</h2>
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
          <input
            className={styles.inputField}
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <label>
          <span>{t("confirmPassword")}</span>
          <input
            className={styles.inputField}
            type="password"
            name="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>

        {!loading && (
          <button className="button">{t("getStarted")}!</button>
        )}
      </form>
      {loading && (
        <button className="button" disabled>
          {t("loading")}...
        </button>
      )}
      {error && <p className="error">{error}</p>}
      <p>{t("or")}</p>
      <div className={styles.loginOptions}>
        <button className={styles.googleButton}>
          <FaGoogle size={22} />
          <p>{t("continueWithGoogle")}</p>
        </button>
        <button className={styles.appleButton}>
          <FaApple size={24} />
          <p>{t("continueWithApple")}</p>
        </button>
      </div>
    </div>
  );
};

export default RegisterContainer;
