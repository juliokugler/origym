import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, collection, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const isCancelled = useRef(false);

  const checkIfIsCancelled = useCallback(() => {
    if (isCancelled.current) throw new Error("Operation cancelled");
  }, []);

  const handleError = (error) => {
    const errorMessages = {
      "auth/weak-password": "A senha precisa conter pelo menos 6 caracteres.",
      "auth/email-already-in-use": "E-mail já cadastrado.",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/invalid-credential": "Senha ou usuário incorretos.",
    };

    setError(errorMessages[error.code] || "Ocorreu um erro, por favor tente novamente mais tarde.");
    console.error(error);
  };

  const setUserInfo = async (userUid, data) => {
    try {
      const flattenedData = {
        displayName: "",
        firstName: data.firstName,
        lastName: data.lastName,
        photoURL: data.photoURL,
        initialWeight: 70,
        currentWeight: 70,
        TDEE: 2000,
        waterIntake: 2,
        proteinIntake: 110,
        carbsIntake: 250,
        fatIntake: 50,
        height: 170,
        age: null,
        activityLevel: "Moderately Active",
        mainGoal: "Improve Health",
        bio: "",
        following: [], // Initialize empty following array
        ...data,
      };

      delete flattenedData.password;

      await setDoc(doc(db, `users/${userUid}`), flattenedData);
    } catch (error) {
      handleError(error);
    }
  };

  const createUser = async (data) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.firstName, photoURL: data.photoURL });

      const sampleData = {
        weight: [
          { date: "2023-05-14", weight: 71 },
          { date: "2023-05-15", weight: 71.2 },
          { date: "2023-05-16", weight: 70.9 },
          { date: "2023-05-17", weight: 71.1 },
          { date: "2023-05-18", weight: 70 },
        ],
      };

      for (const { date, weight } of sampleData.weight) {
        await setDoc(doc(db, `users/${user.uid}/weight/${date}`), { weight, date: new Date(date) });
      }

      await setUserInfo(user.uid, data);

      navigate("/onboarding");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (currentUserId, followUserId) => {
    setLoading(true);
    try {
      const currentUserRef = doc(db, `users/${currentUserId}`);
      const followUserRef = doc(db, `users/${followUserId}`);

      await updateDoc(currentUserRef, {
        following: arrayUnion(followUserId),
      });

      await updateDoc(followUserRef, {
        followers: arrayUnion(currentUserId),
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async (currentUserId, unfollowUserId) => {
    setLoading(true);
    try {
      const currentUserRef = doc(db, `users/${currentUserId}`);
      const unfollowUserRef = doc(db, `users/${unfollowUserId}`);

      await updateDoc(currentUserRef, {
        following: arrayRemove(unfollowUserId),
      });

      await updateDoc(unfollowUserRef, {
        followers: arrayRemove(currentUserId),
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { auth, createUser, error, logout, login, loading, followUser, unfollowUser };
};