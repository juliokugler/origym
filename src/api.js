import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

// Function to fetch friend profile data based on friend UID
export const getFriendProfile = async (friendUid) => {
  try {
    const firestore = getFirestore();
    const userDataRef = doc(db, "users", friendUid, "userInfo", "userProfile");
    const docSnapshot = await getDoc(userDataRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    throw new Error("Error fetching friend profile:", error);
  }
};
