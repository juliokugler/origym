import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./UserInfoStep.module.css";
import Header from "../Header/Header";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import uploadImage from "../../../assets/Icons/add-a-photo-outline.png"

const UserInfoStep = ({ userData, handleChange, handleNext, t, userUid }) => {
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(userData.newPhotoURL || "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd");

  useEffect(() => {
    if (userData.newPhotoURL) {
      setPhotoURL(userData.newPhotoURL);
    }
  }, [userData.newPhotoURL]);
console.log(userData)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const userAvatarRef = ref(storage, `avatars/${userUid}`);
      try {
        // Delete the previous avatar if it exists
        const prevAvatarURL = userData.newPhotoURL;
        if (prevAvatarURL && prevAvatarURL !== photoURL) {
          const prevAvatarRef = ref(storage, prevAvatarURL);
          await deleteObject(prevAvatarRef);
        }

        // Upload the new avatar
        await uploadBytes(userAvatarRef, file);
        const downloadURL = await getDownloadURL(userAvatarRef);

        // Update the user data with the new avatar URL
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

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <Header t={t} />
      <div className={classNames("card", styles.step)}>
        <div className={styles.avatarContainer}>
        <img
          className={styles.avatar}
          src={photoURL}
          alt="Avatar"
        />
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
        </div></div>
        <label>
          {t("username")}: *
          <input
            type="text"
            name="displayName"
            value={userData.displayName}
            onChange={handleChange}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className="button" onClick={handleNext} disabled={uploading}>
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoStep;