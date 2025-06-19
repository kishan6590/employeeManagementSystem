import React from "react";
import apiClient from "../../service/apiClient";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";
function Header({ userRole }) {
  const { setIsEmployeeLoggedIn, setIsAdminLoggedIn } = useAuth();
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      if (userRole == "employee") {
        const data = await apiClient.employeeLogOut();

        if (data?.success) {
          localStorage.clear();
          alert(data?.message);
          setUserData(null);
          setIsEmployeeLoggedIn(null);
          navigate("/");
        }
        if (!data?.success) {
          alert(data?.message);
        }
      } else if (userRole == "admin") {
        const data = await apiClient.adminLogOut();

        if (data?.success) {
          localStorage.clear();
          setUserData(null);
          alert(data?.message);
          setIsAdminLoggedIn(null);
          navigate("/admin/login");
        }
        if (!data?.success) {
          alert(data?.message);
        }
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="flex justify-between  items-end p-6 ">
      <h1 className="text-2xl font-medium">
        Hello <br />
        <span className="text-3xl font-semibold"> {userData.name}👋</span>{" "}
      </h1>
      <button
        onClick={handleLogout}
        className="  py-3 px-5 rounded-sm text-lg font-medium  bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}

export default Header;
