import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthValue } from "../../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

const ChangePhotoURL = () => {
  const { user } = useAuthValue();
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the photoURL in the user's profile document in Firestore
      const userRef = doc(db, "users", user.uid, "userInfo", "userProfile");
      await updateDoc(userRef, {
        photoURL: newPhotoURL,
      });

      // Update the photoURL in the user's actual Firebase authentication profile
      await updateProfile(user, {
        photoURL: newPhotoURL,
      });

      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Error updating photo URL:", error.message);
      setError("Error updating photo URL. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Change Profile Photo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Photo URL:
          <input
            type="text"
            value={newPhotoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Photo URL updated successfully!</p>
      )}
    </div>
  );
};

export default ChangePhotoURL;
