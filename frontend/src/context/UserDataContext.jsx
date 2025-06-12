import { useContext, createContext, Children, useState } from "react";

const UserDataContext = createContext();
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
export const useUserData = () => {
  return useContext(UserDataContext);
};
