import React, {useState} from 'react'
import classNames from 'classnames';
import styles from "./Settings.module.css"

const UserInfoCard = ({userData}) => {
    const [profilePicture, setProfilePicture] = useState(userData.userProfile.photoURL);
    const [displayName, setDisplayName] = useState(userData.userProfile.displayName);
    const [gender, setGender] = useState("");

    const handleProfilePictureChange = (event) => {
        setProfilePicture(URL.createObjectURL(event.target.files[0]));
      };
    
      if (!userData) {
      ;
        return (
          <div className="loader-container">
            <div className="loader-medium" />
          </div>
        );
      }
  return (
    <div className={classNames('card')}>
    <div className={styles.userInfoContainer}>
      <h3>Profile Picture & Username</h3>
      <div className={styles.photoUpload}>
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className={styles.profilePicture}
          />
        ) : (
          <div className={styles.imagePlaceholder}>Upload Profile Picture</div>
        )}
        <input type="file" onChange={handleProfilePictureChange} />
      </div>
      <div className={styles.inputGroup}>
        <label>Username</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
    </div>
  </div>
  )
}

export default UserInfoCard