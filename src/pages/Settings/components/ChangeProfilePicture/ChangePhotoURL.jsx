//React
import React, { useState } from "react";

//Firebase
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { updateProfile } from "firebase/auth";

const ChangePhotoURL = ({user}) => {
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const userRef = doc(db, "users", user.uid, "userInfo", "userProfile");
      await updateDoc(userRef, {
        photoURL: newPhotoURL,
      });

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
