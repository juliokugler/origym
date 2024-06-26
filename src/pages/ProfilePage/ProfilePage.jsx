import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import Header from "../../components/Header/Header";
import MainProfile from "../../components/profileComponents/MainProfile/MainProfile";
import Achievements from "../../components/profileComponents/Achievements/Achievements";
import PersonalFeed from "../../components/profileComponents/PersonalFeed/PersonalFeed";
import Media from "../../components/profileComponents/Media/Media";
import { useParams } from "react-router-dom";
import useFetchFriendData from "../../hooks/useFetchFriendData";

const ProfilePage = ({ t, user, userData, onUserInfoChange, dailyInfo, isMobile }) => {
  const { userId } = useParams();
  const { friendData, friendDailyInfo } = useFetchFriendData(userId, onUserInfoChange);

  // Determine if the profile being viewed is the user's own profile
  const isOwnProfile = !userId || userId === user.uid;

  // Determine which profile data to use based on whether it's the own profile or a friend's profile
  const profileData = isOwnProfile ? userData : friendData;
  const profileDailyInfo = isOwnProfile ? dailyInfo : friendDailyInfo;

  const [selectedSection, setSelectedSection] = useState("personalFeed");

  if (!profileData) {
    return <p>{t("loading")}...</p>;
  }

  return (
    <div className={!isMobile ? "container" : "container-mobile"}>
      <Header isMobile={isMobile} userData={userData} t={t} pageType="profile" />
      {!isMobile ? (
        <div className="mainSection">
          <div className={styles.leftSection}>
            <div className={`card ${styles.profile}`}>
              <MainProfile
                onUserInfoChange={onUserInfoChange}
                userData={profileData}
                dailyInfo={profileDailyInfo}
                user={user}
                t={t}
                friendInfo={!isOwnProfile}
                userId={userId}
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
                    photoURL={profileData.userProfile.photoURL}
                    userId={userId || user.uid}
                    userName={`${profileData.userProfile.firstName} ${profileData.userProfile.lastName}`}
                    friendInfo={!isOwnProfile ? friendData : null}
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
      ) : (
        <div className="mainSection-mobile">
          <div className={`card ${styles.profile_mobile}`}>
            <MainProfile
            isMobile={isMobile}
              onUserInfoChange={onUserInfoChange}
              userData={profileData}
              dailyInfo={profileDailyInfo}
              user={user}
              t={t}
              friendInfo={!isOwnProfile}
              userId={userId}
            />
          </div>
          <div className={styles.mobileButtons}>
            <button
              className={selectedSection === "personalFeed" ? styles.activeButton : ""}
              onClick={() => setSelectedSection("personalFeed")}
            >
              {t("Feed")}
            </button>
            <button
              className={selectedSection === "media" ? styles.activeButton : ""}
              onClick={() => setSelectedSection("media")}
            >
              {t("media")}
            </button>
            <button
              className={selectedSection === "achievements" ? styles.activeButton : ""}
              onClick={() => setSelectedSection("achievements")}
            >
              {t("achievements")}
            </button>
          </div>
          <div className="mobileContent">
            {selectedSection === "personalFeed" && (
              <div className={`card ${styles.personalFeed_mobile}`}>
                <h3 className="title">{t("personalFeed")}</h3>
                <PersonalFeed
                isMobile={isMobile}
                  photoURL={profileData.userProfile.photoURL}
                  userId={userId || user.uid}
                  userName={`${profileData.userProfile.firstName} ${profileData.userProfile.lastName}`}
                  friendInfo={!isOwnProfile ? friendData : null}
                  t={t}
                />
              </div>
            )}
            {selectedSection === "media" && (
              <div className={`card ${styles.media}`}>
                <h3 className={styles.mediaTitle}>{t("media")}</h3>
                <Media t={t} />
              </div>
            )}
            {selectedSection === "achievements" && (
              <div className={`card ${styles.achievements}`}>
                <div className={styles.titleAndIcon}>
                  <h3 className="title">{t("achievements")}</h3>
                </div>
                <Achievements t={t} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;