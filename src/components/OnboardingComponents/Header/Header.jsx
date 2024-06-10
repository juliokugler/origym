import React from 'react'
import styles from "./Header.module.css"
import Logo from "../../../assets/Icons/Logo.png"

const Header = ({t}) => {
  return (
    <div className={styles.title}>
    <img src={Logo} alt="Logo" />
    <h2>{t("welcomeToOrigym")}</h2>
    <p>{t("fewDetails")}</p>
  </div>
  )
}

export default Header