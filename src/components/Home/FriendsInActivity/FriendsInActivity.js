import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

//Styles
import styles from "./FriendsInActivity.module.css";

//Assets
import Lightining_active from "../../../assets/Icons/Lightning_active.png";

//Hooks
import { db } from "../../../firebase/config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import getFriendProfile from "./getFriendsProfile";

const FriendsInActivity = ({ userData, user }) => {
  const [friendsData, setFriendsData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

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

        console.log("Following IDs:", followingIds);

        // Fetch friend profiles using map and async/await
        const friendsData = await Promise.all(
          followingIds.map(async (followingId) => {
            console.log("Fetching friend profile for ID:", followingId);
            const friendProfile = await getFriendProfile(followingId);
            console.log("Friend profile for", followingId, ":", friendProfile); // Added log
            return friendProfile;
          })
        );

        console.log("Fetched Friends Data:", friendsData);
        setFriendsData(friendsData);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    if (user && user.uid) {
      console.log("Fetching friends data for user ID:", user.uid);
      fetchFriendsData();
    }
  }, [userData]);

  return (
    <div className={styles.card}>
      {friendsData.map((friend, index) => (
        <div
          className={styles.friendCard}
          key={index}
          onClick={() => navigate(`/profile/${friend.uid}`)} // Pass friend.uid to goToFriendProfile
        >
          <div className={styles.avatar}>
            <img src={friend.photoURL} alt={`Friend ${index + 1}`} />
            <div className={styles.onlineIndicator}></div>
          </div>
          <div className={styles.activity}>
            <p className={styles.friendName}>{friend.firstName}</p>
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
