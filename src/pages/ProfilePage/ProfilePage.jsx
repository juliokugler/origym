import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "./ProfilePage.module.css";
import Header from "../../components/Header/Header";
import MainProfile from "../../components/profileComponents/MainProfile/MainProfile";
import Achievements from "../../components/profileComponents/Achievements/Achievements";
import PersonalFeed from "../../components/profileComponents/PersonalFeed/PersonalFeed";
import Media from "../../components/profileComponents/Media/Media";
import { useParams } from "react-router-dom";

const ProfilePage = ({ t, userData, dailyInfo, user, onUserInfoChange }) => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [profileDailyInfo, setProfileDailyInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async (userId) => {
      setLoading(true);
      console.log("Fetching profile data for userId:", userId);
      try {
        const firestore = getFirestore();

        // Fetch user profile data
        const userProfileRef = doc(firestore, "users", userId, "userInfo", "userProfile");
        console.log("Fetching user profile from:", userProfileRef.path);
        const userProfileSnapshot = await getDoc(userProfileRef);

        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();
          console.log("Fetched user profile data:", userProfileData);
          setProfileData(userProfileData);

          // Fetch daily info data
          const currentDate = new Date().toISOString().slice(0, 10);
          const dailyInfoRef = doc(firestore, `users/${userId}/dailyInfo`, currentDate);
          console.log("Fetching daily info from:", dailyInfoRef.path);
          const dailyInfoSnapshot = await getDoc(dailyInfoRef);

          if (dailyInfoSnapshot.exists()) {
            const dailyInfoData = dailyInfoSnapshot.data();
            console.log("Fetched daily info data:", dailyInfoData);
            setProfileDailyInfo(dailyInfoData);
          } else {
            console.log("Daily info document for current date does not exist!");
          }
        } else {
          console.log("User profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
        console.log("Finished fetching profile data");
      }
    };

    if (userId && userId !== user.uid) {
      fetchProfileData(userId);
    } else {
      setProfileData(userData);
      setProfileDailyInfo(dailyInfo);
      console.log("Using default userData and dailyInfo");
    }
  }, [userId, user, userData, dailyInfo]);

  if (loading) {
    return <p>{t("loading")}...</p>;
  }

  if (!profileData) {
    return <p>{t("loading")}...</p>; // Or you can show a different message indicating no data
  }

  console.log("Rendering ProfilePage with userId:", userId);
  console.log("profileData:", profileData);
  console.log("profileDailyInfo:", profileDailyInfo);

  return (
    <div className="container">
      <Header t={t} pageType="profile" />
      <div className="mainSection">
        <div className={styles.leftSection}>
          <div className={`card ${styles.profile}`}>
            <MainProfile
              onUserInfoChange={onUserInfoChange}
              userData={profileData}
              dailyInfo={profileDailyInfo}
              user={user}
              t={t}
              friendInfo={userId && userId !== user.uid ? profileData : null}
            />
          </div>
          <div className={styles.innerSection}>
            <div className={styles.firstColumn}>
              <div className={`card ${styles.achievements}`}>
                <div className={styles.titleAndIcon}>
                  <h3 className="title">{t("achievements")}</h3>
                </div>
                <Achievements t={t} />
              </div>
            </div>
            <div className={styles.secondColumn}>
              <div className={`card ${styles.personalFeed}`}>
                <h3 className="title">{t("personalFeed")}</h3>
                <PersonalFeed
                  photoURL={profileData.photoURL || user.photoURL}
                  userId={userId || user.uid}
                  userName={profileData.firstName || profileData.firstName}
                  friendInfo={userId && userId !== user.uid ? profileData : null}
                  t={t}
                />
                <div className={styles.innerContainer}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdColumn}>
          <div className={`card ${styles.media}`}>
            <div className={styles.titleAndDropdown}>
              <h3 className={styles.mediaTitle}>{t("media")}</h3>
            </div>
            <Media t={t} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;