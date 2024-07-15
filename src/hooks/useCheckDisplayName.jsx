import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useCheckDisplayName = (displayName) => {
  const [status, setStatus] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkDisplayName = useCallback(async () => {
    if (!displayName) {
      setStatus("neutral");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const lowerCaseName = displayName.toLowerCase()
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayNameLower", "==", lowerCaseName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setStatus("available");
      } else {
        setStatus("taken");
      }
    } catch (error) {
      setError(error);
      setStatus("neutral");
    } finally {
      setLoading(false);
    }
  }, [displayName]);

  useEffect(() => {
    if (!displayName) {
      setStatus("neutral");
      return;
    }

    setStatus("neutral");

    const debounceTimer = setTimeout(() => {
      checkDisplayName();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [checkDisplayName, displayName]);

  return { status, loading, error };
};

export default useCheckDisplayName;