import React, { useState, useEffect } from "react";

//Styles
import styles from "./FriendsPage.module.css";

//Components
import Header from "../../components/Header/Header";
import { FaUserFriends, FaUserPlus, FaRunning } from "react-icons/fa";
import Feed from "./feed";

// Dummy data for illustration
const friendsData = [
  { name: "Alice", activity: "Running", status: "active" },
  { name: "Bob", activity: "Cycling", status: "inactive" },
  { name: "Charlie", activity: "Swimming", status: "active" },
  // Add more friends as needed
];

const FriendsPage = ({ t, user, userData, dailyInfo }) => {
  const [friends, setFriends] = useState(friendsData);
console.log(user)
  const activeFriends = friends.filter((friend) => friend.status === "active");

  return (
    <div className={styles.container}>
      <Header t={t} pageType="friends" />

      <div className={styles.mainSection}>
        <div className={styles.firstCardColumn}>
          <div className={styles.friendsCard}>
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
        </div>
        <div className={styles.secondCardColumn}>
        <div className={styles.activityCard}>
         <Feed userId={user.uid} userName={user.displayName} t={t} />
         </div>
        </div>
        <div className={styles.thirdCardColumn}>
          <div className={styles.recommendationsCard}>
            <h3 className={styles.cardTitle}>Friend Recommendations</h3>
            <div className={styles.recommendationsList}>
              {/* Add friend recommendations here */}
              <p>Feature coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
