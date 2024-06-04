import React, { createContext, useContext, useState } from "react";
import useFetchUserData from "../hooks/useFetchUserData";

const UserDataContext = createContext();

export const UserDataProvider = ({ user, children }) => {
  const [userInfoChange, setUserInfoChange] = useState(false);
  const { userData, dailyInfo, loading } = useFetchUserData(
    user,
    userInfoChange
  );

  return (
    <UserDataContext.Provider
      value={{ userData, dailyInfo, loading, setUserInfoChange }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
