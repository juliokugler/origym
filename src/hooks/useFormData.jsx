import { useState, useEffect } from "react";

const useFormData = (user, userProfile) => {
console.log(user, userProfile)

  const [userData, setUserData] = useState({
    age: "",
    height: "",
    weight: "",
    weightGoal: "",
    activityLevel: "1",
    gender: "",
    mainGoal: "",
    newPhotoURL: "",
    displayName: userProfile?.lastName|| "",
  });

  useEffect(() => {
    if (userProfile) {
      setUserData((prevState) => ({
        ...prevState,
        displayName: `@${userProfile.firstName}${userProfile.lastName}`,
      }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGoalChange = (goal) => {
    setUserData((prevData) => ({
      ...prevData,
      mainGoal: goal,
    }));
  };

  const handleActivityLevelChange = (level) => {
    setUserData((prevData) => ({
      ...prevData,
      activityLevel: level,
    }));
  };

  return { userData, setUserData, handleChange, handleGoalChange, handleActivityLevelChange };
};

export default useFormData;