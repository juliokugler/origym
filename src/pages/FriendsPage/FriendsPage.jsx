//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./FriendsPage.module.css";
import classNames from "classnames"

//Components
import Header from "../../components/Header/Header";
import { FaUserFriends, FaUserPlus} from "react-icons/fa";
import Feed from "../../components/Page_Friends_Components/FriendsFeed/FriendsFeed";

// Dummy data for illustration
const friendsData = [
  { name: "Alice", activity: "Running", status: "active" },
  { name: "Bob", activity: "Cycling", status: "inactive" },
  { name: "Charlie", activity: "Swimming", status: "active" },
];

const FriendsPage = ({ t, user, userData, dailyInfo, isMobile }) => {
  const [friends, setFriends] = useState(friendsData);
console.log(user)
  const activeFriends = friends.filter((friend) => friend.status === "active");

  return (
    <div className={!isMobile ? "container" : "container-mobile"}>
      <Header isMobile={isMobile} userData={userData} t={t} pageType="friends" />

      <div className={!isMobile ? "mainSection" : "mainSection-mobile"}>
        <div className={styles.firstCardColumn}>
                 {!isMobile ? (
          <div className={classNames(styles.friendsCard, "card")}>
            <div className={styles.titleAndButton}>
              <h3 className={styles.cardTitle}>Friends</h3>
              <button className={styles.addButton}>
                <FaUserPlus /> Add Friend
              </button>
            </div>
            <div className={styles.friendsList}>
              {friends.map((friend, index) => (
                <div key={index} className={styles.friendItem}>
                  <FaUserFriends />
                  <span>{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}</div>
        <div className={styles.secondCardColumn}>
       <div className={!isMobile ? classNames(styles.feedCard, "card") : classNames(styles.feedCard_mobile, "card")}>
        <h3 className={styles.cardTitle}>Feed</h3>
         <Feed userId={user.uid} isMobile={isMobile} photoURL={user.photoURL} userName={user.displayName} t={t} />
         </div>
        </div>
        <div className={styles.thirdCardColumn}>
        <div className={!isMobile ? classNames(styles.recommendationsCard, "card") : classNames(styles.recommendationsCard_mobile, "card")}>
            <h3 className={styles.cardTitle}>Friend Recommendations</h3>
            <div className={styles.recommendationsList}>
                     <p>Feature coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
