//React
import React from 'react'

//Styles
import styles from "./Partners.module.css"

//Images 
import partners from "../../../../assets/Icons/partners.png";

const Partners = ({t}) => {
  return (
    <div className={styles.partners}>
    <div className={styles.partnersInfo}>
      <h2>{t("TheyTrustUs")}</h2>
    </div>
    <img src={partners} alt="Partners" />
  </div>
  )
}

export default Partners