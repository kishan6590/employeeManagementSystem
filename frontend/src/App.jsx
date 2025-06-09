import React from "react";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeLogin from "./components/Auth/EmployeeLogin";
import AdminLogin from "./components/Auth/AdminLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
    </Routes>
  );
}

export default App;
