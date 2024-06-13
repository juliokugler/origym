import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const useFetchUserData = (user, userInfoChange) => {
  const [userData, setUserData] = useState(null);
  const [dailyInfo, setDailyInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User or user ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const userProfileRef = doc(
          firestore,
          "users",
          user.uid        );
        const userProfileSnapshot = await getDoc(userProfileRef);

        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            userProfile: userProfileData,
          }));

          fetchDailyInfo(userProfileData.TDEE);
        } else {
          console.log("User profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchDailyInfo = async (TDEE) => {
      try {
        if (!user || !user.uid) {
          console.error("User or user ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const currentDate = new Date().toISOString().slice(0, 10);
        const dailyInfoRef = doc(
          firestore,
          `users/${user.uid}/dailyInfo`,
          currentDate
        );
        const dailyInfoSnapshot = await getDoc(dailyInfoRef);

        if (dailyInfoSnapshot.exists()) {
          const dailyInfoData = dailyInfoSnapshot.data();
          setDailyInfo(dailyInfoData);
          setUserData((prevUserData) => ({
            ...prevUserData,
            dailyInfo: dailyInfoData,
          }));
        } else {
          console.log("Daily info document for current date does not exist!");

          const initialDailyInfo = {
            TDEE: TDEE || 2000,
            caloriesConsumed: 0,
            proteinConsumed: 0,
            fatConsumed: 0,
            carbsConsumed: 0,
            sleep: 0,
            stepsTaken: 0,
            waterConsumed: 0,
            workoutsDone: [],
          };

          await setDoc(dailyInfoRef, initialDailyInfo);
          setDailyInfo(initialDailyInfo);
          setUserData((prevUserData) => ({
            ...prevUserData,
            dailyInfo: initialDailyInfo,
          }));
        }
      } catch (error) {
        console.error("Error fetching daily info:", error);
      }
    };

    const fetchFriendsList = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User or user ID is null or undefined.");
          return;
        }

        const firestore = getFirestore();
        const friendsListRef = doc(firestore, `users/${user.uid}/friendsList`);
        const friendsListSnapshot = await getDoc(friendsListRef);

        if (friendsListSnapshot.exists()) {
          const friendsListData = friendsListSnapshot.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            friendsList: friendsListData,
          }));
        } else {
          console.log("Friends list document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching friends list:", error);
      }
    };

    if (user) {
      fetchUserProfile();
      fetchFriendsList();
    } else {
      setUserData(null);
    }
  }, [user, userInfoChange]);

  return { userData, dailyInfo, setDailyInfo };
};

export default useFetchUserData;