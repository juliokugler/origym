import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./UserInfoStep.module.css";
import Header from "../Header/Header";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import uploadImage from "../../../assets/Icons/add-a-photo-outline.png";
import useCheckDisplayName from "../../../hooks/useCheckDisplayName";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import useImageLoad from "../../../hooks/useImageLoad";

const UserInfoStep = ({ userData, handleChange, handleNext, t, userUid }) => {
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(userData.newPhotoURL || "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd");
  const [username, setUsername] = useState(userData.displayName);
  const isImageLoaded = useImageLoad(photoURL)
  const { status, loading: checkingDisplayName } = useCheckDisplayName(username);

  useEffect(() => {
    if (userData.newPhotoURL) {
      setPhotoURL(userData.newPhotoURL);
    }
  }, [userData.newPhotoURL]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const userAvatarRef = ref(storage, `avatars/${userUid}`);
      try {
        const prevAvatarURL = userData.newPhotoURL;
        if (prevAvatarURL && prevAvatarURL !== photoURL) {
          const prevAvatarRef = ref(storage, prevAvatarURL);
          await deleteObject(prevAvatarRef);
        }

        await uploadBytes(userAvatarRef, file);
        const downloadURL = await getDownloadURL(userAvatarRef);

        handleChange({
          target: {
            name: "newPhotoURL",
            value: downloadURL,
          },
        });
        setPhotoURL(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    handleChange(e);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <Header t={t} />
      <div className={classNames("card", styles.step)}>
        <div className={styles.avatarContainer}>{uploading || !isImageLoaded ? (<div className={styles.avatar}><div className="loader"/></div>): (
          <img className={styles.avatar} src={photoURL} alt="Avatar" />)}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
          <div className={styles.uploadIcon} onClick={triggerFileInput}>
            <img src={uploadImage} alt="Upload Image" />
          </div>
        </div>
        <label>
          {t("username")}: *
          <input
            type="text"
            name="displayName"
            value={username}
            onChange={handleUsernameChange}
          />
          <div className={styles.statusMessage}>
            {checkingDisplayName && (
              <div className={styles.messageLoading}>
                <FaSpinner className={styles.spinner} />
                {t("checkingUsername")}
              </div>
            )}
            {!checkingDisplayName && status === "taken" && username !== "" && (
              <div className={styles.messageTaken}>
                <FaTimesCircle className={styles.iconTaken} />
                {t("usernameTaken")}
              </div>
            )}
            {!checkingDisplayName && status === "available" && username !== "" && (
              <div className={styles.messageAvailable}>
                <FaCheckCircle className={styles.iconAvailable} />
                {t("usernameAvailable")}
              </div>
            )}
          </div>
        </label>
        <div className={styles.buttonContainer}>
          <button
            className="button"
            onClick={handleNext}
            disabled={uploading || status !== "available" || checkingDisplayName}
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoStep;