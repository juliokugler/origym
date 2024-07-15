//React
import { db } from "../../../../firebase/config";

//Styles
import { collection, doc, getDoc } from "firebase/firestore";

const getFriendProfile = async (friendUid) => {
  try {
    const userDoc = doc(db, "users", friendUid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const friendData = userSnapshot.data();
      friendData.uid = friendUid;
      return friendData;
    } else {
      throw new Error(`Friend profile with ID ${friendUid} does not exist.`);
    }
  } catch (error) {
    throw new Error(`Error fetching friend profile: ${error.message}`);
  }
};

export default getFriendProfile;
