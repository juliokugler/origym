//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./FriendsInActivity.module.css";

//Assets
import Lightining_active from "../../../assets/Icons/Lightning_active.png";

//Hooks
import { getFriendProfile } from "../../../api";

const FriendsInActivity = ({ userData }) => {
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    console.log("Data Received:", userData);
    const fetchFriendsData = async () => {
      try {
        const following = userData.userProfile.following;
        const friendsDataPromises = following.map(async (friendUid) => {
          const friendProfile = await getFriendProfile(friendUid);
          return friendProfile;
        });
        const friendsData = await Promise.all(friendsDataPromises);
        setFriendsData(friendsData);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    if (userData.userProfile && userData.userProfile.following) {
      fetchFriendsData();
    }
  }, [userData]);

  const handlePowerSent = (friendUid) => {
    // Implement your logic for sending power to friend
    console.log("Power sent to friend:", friendUid);
  };

  return (
    <div className={styles.card}>
      {friendsData.map((friend, index) => (
        <div className={styles.friendCard} key={index}>
          <div className={styles.avatar}>
            <img src={friend.photoURL} alt={`Friend ${index + 1}`} />
            <div className={styles.onlineIndicator}></div>
          </div>
          <div className={styles.activity}>
            <p className={styles.friendName}>{friend.displayName}</p>
            <p className={styles.friendWorkout}>Strength Workout</p>
          </div>
          <button
            className={styles.active}
            onClick={() => handlePowerSent(friend.uid)}
          >
            <p>
              Power Sent <img src={Lightining_active} alt="Active Lightning" />
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendsInActivity;
