import React from "react";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeLogin from "./components/Auth/EmployeeLogin";
import AdminLogin from "./components/Auth/AdminLogin";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isEmployeeLoggedIn,
    setIsEmployeeLoggedIn,
  } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<EmployeeLogin />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/employee/dashboard"
        element={
          isEmployeeLoggedIn ? <EmployeeDashboard /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/dashboard"
        element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
