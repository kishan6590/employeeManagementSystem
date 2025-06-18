import { useContext, createContext, Children, useState } from "react";

const UserDataContext = createContext();
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : null;
  });
  // const [userData, setUserData] = useState("");
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>    
  );
};
export function useUserData() {
  return useContext(UserDataContext);
}
