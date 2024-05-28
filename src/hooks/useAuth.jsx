import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuth = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, loading: user === undefined };
};
