//React
import React from 'react'

//Styles
import styles from "./Media.module.css"

//Images
import media1 from "../../../../assets/Images/Media/Media1.png"
import media2 from "../../../../assets/Images/Media/Media2.png"
import media3 from "../../../../assets/Images/Media/Media3.png"
import media4 from "../../../../assets/Images/Media/Media4.png"
import media5 from "../../../../assets/Images/Media/Media5.png"
import media6 from "../../../../assets/Images/Media/Media6.png"

const Media = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}><img src={media1}/></div>
      <div className={styles.card}><img src={media2}/></div>
      <div className={styles.card}><img src={media3}/></div>
      <div className={styles.card}><img src={media4}/></div>
      <div className={styles.card}><img src={media5}/></div>
      <div className={styles.card}><img src={media6}/></div>
    </div>
  )
}

export default Media