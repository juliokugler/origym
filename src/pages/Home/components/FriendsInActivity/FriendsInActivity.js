//React
import React, { useState, useEffect } from "react";

// Styles
import styles from "./FriendsInActivity.module.css";

//Firebase
import { db } from "../../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

// Icons
import Lightining_active from "../../../../assets/Icons/Lightning_active.png";

// Hooks
import { useNavigate } from "react-router-dom";
import getFriendProfile from "./getFriendsProfile";

const FriendsInActivity = ({ user }) => {
  const [friendsData, setFriendsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const followsRef = collection(db, "users", user.uid, "follows");
        const followingSnapshot = await getDocs(followsRef);

        const followingIds = [];
        followingSnapshot.forEach((doc) => {
          const followingId = doc.data().followingId;
          if (followingId) {
            followingIds.push(followingId);
          }
        });

        const friendsData = await Promise.all(
          followingIds.map(async (followingId) => {
            const friendProfile = await getFriendProfile(followingId);
            return friendProfile;
          })
        );

        setFriendsData(friendsData);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    if (user && user.uid) {
      fetchFriendsData();
    }
  }, [user]);

  return (
    <div className={styles.card}>
      {friendsData.map((friend, index) => (
        <div
          className={styles.friendCard}
          key={index}
          onClick={() => navigate(`/profile/${friend.uid}`)}
        >
          <div className={styles.avatar}>
            <img src={friend.photoURL} alt={`Friend ${index + 1}`} />
            <div className={styles.onlineIndicator}></div>
          </div>
          <div className={styles.activity}>
            <p className={styles.friendName}>@{friend.displayName}</p>
            <p className={styles.friendWorkout}>Strength Workout</p>
          </div>
          <button className={styles.active}>
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
