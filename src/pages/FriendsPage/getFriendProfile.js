import { db } from "./firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";

const getFriendProfile = async (friendUid) => {
  try {
    const userDoc = doc(db, "users", friendUid, "userInfo", "userProfile");
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      throw new Error(`Friend profile with ID ${friendUid} does not exist.`);
    }
  } catch (error) {
    throw new Error(`Error fetching friend profile: ${error.message}`);
  }
};

export default getFriendProfile;
