import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthValue } from "../contexts/AuthContext";

const useFetchUserData = (intakeChange) => {
  const { user } = useAuthValue();
  const [userData, setUserData] = useState({
    userProfile: {},
    dailyInfo: {},
    friendsList: [],
  });

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
          user.uid,
          "userInfo",
          "userProfile"
        );
        const userProfileSnapshot = await getDoc(userProfileRef);

        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            userProfile: userProfileData,
          }));
        } else {
          console.log("User profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user metrics:", error);
      }
    };

    const fetchDailyInfo = async () => {
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
          setUserData((prevUserData) => ({
            ...prevUserData,
            dailyInfo: dailyInfoData,
          }));
        } else {
          console.log("Daily info document for current date does not exist!");

          // Create a new daily info document with default values
          const initialDailyInfo = {
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
          console.log("New daily info document created.");

          // Set the userData state with the initial daily info
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
        const userProfileRef = doc(
          firestore,
          "users",
          user.uid,
          "userInfo",
          "userProfile"
        );
        const userProfileSnapshot = await getDoc(userProfileRef);

        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();

          setUserData((prevUserData) => ({
            ...prevUserData,
            userProfileData: userProfileData,
          }));
        } else {
          console.log("User profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
      fetchDailyInfo();
      fetchFriendsList(); // Call the function to fetch the friends list
    }
  }, [user, intakeChange]); // Include the propValue as a dependency

  return userData;
};

export default useFetchUserData;
