//React
import React from 'react'

//Styles
import styles from "./Header.module.css"

//Icons
import Logo from "../../../../assets/Icons/Logo.png"

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