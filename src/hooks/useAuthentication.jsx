import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const checkIfIsCancelled = useCallback(() => {
    // Implement your cancellation logic here if needed
  }, []);

  const handleError = (error) => {
    let systemErrorMessage;

    switch (error.code) {
      case "auth/weak-password":
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        break;
      case "auth/email-already-in-use":
        systemErrorMessage = "E-mail já cadastrado.";
        break;
      case "auth/user-not-found":
        systemErrorMessage = "Usuário não encontrado.";
        break;
      case "auth/wrong-password":
        systemErrorMessage = "Senha incorreta.";
        break;
      default:
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
    }

    setError(systemErrorMessage);
  };

  const setDailyInfo = async (userId, date, dailyInfo) => {
    await setDoc(doc(db, `users/${userId}/dailyInfo/${date}`), dailyInfo);
  };

  const setWorkouts = async (userId, date, workouts) => {
    await setDoc(doc(db, `users/${userId}/workouts/${date}`), {
      workoutsDone: workouts,
    });
  };

  const setMeals = async (userId, date, meals) => {
    await setDoc(doc(db, `users/${userId}/meals/${date}`), {
      mealsConsumed: meals,
    });
  };

  const setWeight = async (userId, date, weight) => {
    await setDoc(doc(db, `users/${userId}/weight/${date}`), {
      weight,
      date: new Date(date),
    });
  };

  const setSleep = async (userId, date, hours, minutes) => {
    await setDoc(doc(db, `users/${userId}/sleep/${date}`), {
      hours,
      minutes,
      date: new Date(date),
    });
  };

  const setUserInfo = async (userUid, data) => {
    await setDoc(doc(db, `users/${userUid}/userInfo/`, "userProfile"), {
      firstName: data.firstName,
      lastName: data.lastName,
      photoURL: data.photoURL,
      following: [
        "IWbtLCXLwfNeHP20aEVBVGpzeTH3",
        "u1rEZesuRlU3h9XoL7bfnLEhm4E2",
        "lFy2vob4kTU6gC9EpMOrG9wu0C83",
      ],
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
    });
  };

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const sampleSleepData = [
        { date: "2023-05-14", hours: 7, minutes: 30 },
        { date: "2023-05-15", hours: 6, minutes: 45 },
        { date: "2023-05-16", hours: 8, minutes: 15 },
        { date: "2023-05-17", hours: 5, minutes: 50 },
        { date: "2023-05-18", hours: 7, minutes: 20 },
      ];

      const sampleWeightData = [
        { date: "2023-05-14", weight: 71 },
        { date: "2023-05-15", weight: 71.2 },
        { date: "2023-05-16", weight: 70.9 },
        { date: "2023-05-17", weight: 71.1 },
        { date: "2023-05-18", weight: 70 },
      ];

      for (const sleepData of sampleSleepData) {
        await setSleep(
          user.uid,
          sleepData.date,
          sleepData.hours,
          sleepData.minutes
        );
      }

      for (const weightData of sampleWeightData) {
        await setWeight(user.uid, weightData.date, weightData.weight);
      }

      await setUserInfo(user.uid, data);

      // Initialize follows subcollection
      const initialFollows = [
        { followingId: "IWbtLCXLwfNeHP20aEVBVGpzeTH3" },
        { followingId: "u1rEZesuRlU3h9XoL7bfnLEhm4E2" },
        { followingId: "lFy2vob4kTU6gC9EpMOrG9wu0C83" },
      ];

      for (const follow of initialFollows) {
        await setDoc(doc(collection(db, `users/${user.uid}/follows`)), follow);
      }

      await updateProfile(user, {
        displayName: data.firstName,
        photoURL: data.photoURL,
      });

      navigate("/additionalinfo");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/additionalinfo");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => checkIfIsCancelled();
  }, [checkIfIsCancelled]);

  return { auth, createUser, error, logout, login, loading };
};