import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import EmojiPicker from 'emoji-picker-react';
import { FaEdit } from 'react-icons/fa';
import styles from "./MainProfile.module.css";
import facebook_inactive from "../../../assets/Icons/Facebook_inactive.png";
import instagram_active from "../../../assets/Icons/Instagram_active.png";
import twitter_active from "../../../assets/Icons/Twitter_active.png";
import happyEmoji from "../../../assets/Icons/Happy_emoji.png";

const MainProfile = ({ userData, t, user, onUserInfoChange, friendInfo }) => {
  const [newBio, setNewBio] = useState(userData.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
console.log(userData)
  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleBioSubmit = async () => {
    const db = getFirestore();
    const dailyInfoRef = doc(db, `users/${user.uid}`);
  
    try {
      await updateDoc(dailyInfoRef, { bio: newBio });
      console.log("Bio updated successfully.");
      userData.bio = newBio; // Update the displayed bio
      onUserInfoChange();
      console.log("Setting isEditing to false");
      setIsEditing(false); // Exit edit mode
      console.log("isEditing set to false");
      setShowEmojiPicker(false); // Close emoji picker if open
    } catch (error) {
      console.error("Error updating Bio:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.mainInfo}>
      <section className={styles.imgSection}>
        <img src={userData.photoURL} className={styles.avatar} alt="User Avatar" />
      </section>
      <div className={styles.userInfo}>
        <div className={styles.textInfo}>
          <h3>@{userData.displayName}</h3>
          <div className={styles.followInfo}>
            <div className={styles.followCard}>
              <p>{t("following")}:</p>
              {/*<p>{userData.following.length || ""}</p>*/}
            </div>
            <div className={styles.followCard}>
              <p>{t("followers")}:</p>
              {/*<p>{userData.following.length || ""}</p>*/}
            </div>
          </div>
        </div>
        <div className={styles.bioContainer}>
          {isEditing ? (
            <div className={styles.editBioContainer}>
              <label className={styles.bioLabel}>
                <p className={styles.bio}>Bio:</p>
                <textarea value={newBio} onChange={handleBioChange} />
              </label>
              <div className={styles.buttonContainer}>
                <button className="inactiveButton-small" onClick={() => setIsEditing(false)}><p>Close</p></button>
                <button className="button-small" onClick={handleBioSubmit}><p>Save</p></button>
              </div>
              {showEmojiPicker && (
                <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
                  <EmojiPicker onEmojiClick={(emojiObject) => setNewBio(prevBio => prevBio + emojiObject.emoji)} />
                  <button className={styles.closeButton} onClick={() => setShowEmojiPicker(false)}>×</button>
                </div>
              )}
              <button className={styles.emojiButton} onClick={() => setShowEmojiPicker(!showEmojiPicker)}><img src={happyEmoji} alt="Emoji" /></button>
            </div>
          ) : (
            <div className={styles.bioLabel}>
              <p className={styles.bio}>Bio:</p>
              <div className={styles.viewBioContainer}>
                {userData.bio ? (
                  <p>{userData.bio}</p>
                ) : (
                  !friendInfo && (
                    <p className={styles.bio}>Write something about yourself!</p>
                  )
                )}
                {!friendInfo && (
                  <button className={styles.editButton} onClick={() => setIsEditing(true)}><FaEdit /></button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.socialMediaContainer}>
          <div className={styles.socialMedia}>
            <img src={facebook_inactive} alt='Facebook Icon' />
            <img src={twitter_active} alt='Twitter Icon' />
            <img src={instagram_active} alt='Instagram Icon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProfile;