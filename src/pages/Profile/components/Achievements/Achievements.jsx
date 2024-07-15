//React
import React from 'react'

//Styles
import styles from "./Achievements.module.css"

//Images
import achievement1 from "../../../../assets/Achievements/achievement1.png"
import achievement2 from "../../../../assets/Achievements/achievement2.png"
import achievement3 from "../../../../assets/Achievements/achievement3.png"
import achievement5 from "../../../../assets/Achievements/achievement5.png"
import achievement6 from "../../../../assets/Achievements/achievement6.png"

const Achievements = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}><img src={achievement1}/>"Won first place on the weekly podium"</div>
      <div className={styles.card}><img src={achievement2}/>"Received 10 Power Impulses"</div>
      <div className={styles.card}><img src={achievement3}/>"Ran 5 kilometers on a single day"</div>
      <div className={styles.card}><img src={achievement5}/>"Went running with a friend"</div>
      <div className={styles.card}><img src={achievement6}/>"Reached a fitness goal"</div>

    </div>
  )
}

export default Achievements