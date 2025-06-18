import { useContext, createContext, useState } from "react";
import { useUserData } from "./UserDataContext";
const FilterEmployeeContext = createContext("");

export function FilterEmployeeProvider({ children }) {
  const [filterEmployee, setFilterEmployee] = useState(null);

  return (
    <FilterEmployeeContext.Provider
      value={{ filterEmployee, setFilterEmployee }}
    >
      {children}
    </FilterEmployeeContext.Provider>
  );
}

export function useFilterEmployee() {
  return useContext(FilterEmployeeContext);
}
