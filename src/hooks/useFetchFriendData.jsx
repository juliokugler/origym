import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useFetchFriendData = (friendId, onUserInfoChange) => {
  const [friendData, setFriendData] = useState(null);
  const [friendDailyInfo, setFriendDailyInfo] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        if (!friendId) {
          console.error("Friend ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const friendProfileRef = doc(firestore, "users", friendId);
        const friendProfileSnapshot = await getDoc(friendProfileRef);

        if (friendProfileSnapshot.exists()) {
          const friendProfileData = friendProfileSnapshot.data();
          setFriendData({
            userProfile: friendProfileData,
          });

          fetchFriendDailyInfo(friendId);
        } else {
          console.log("Friend profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching friend profile:", error);
      }
    };

    const fetchFriendDailyInfo = async (friendId) => {
      try {
        if (!friendId) {
          console.error("Friend ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const currentDate = new Date().toISOString().slice(0, 10);
        const dailyInfoRef = doc(firestore, `users/${friendId}/dailyInfo`, currentDate);
        const dailyInfoSnapshot = await getDoc(dailyInfoRef);

        if (dailyInfoSnapshot.exists()) {
          const dailyInfoData = dailyInfoSnapshot.data();
          setFriendDailyInfo(dailyInfoData);
          setFriendData((prevFriendData) => ({
            ...prevFriendData,
            dailyInfo: dailyInfoData,
          }));
        } else {
          console.log("Daily info document for current date does not exist!");
          setFriendDailyInfo(null);
        }
      } catch (error) {
        console.error("Error fetching friend daily info:", error);
      }
    };

    if (friendId) {
      fetchFriendProfile();
    } else {
      setFriendData(null);
    }
  }, [friendId, onUserInfoChange]);

  return { friendData, friendDailyInfo };
};

export default useFetchFriendData;