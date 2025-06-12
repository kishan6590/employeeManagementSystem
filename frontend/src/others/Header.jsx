import React from "react";
import apiClient from "../../service/apiClient";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

function Header({ userRole }) {
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();
  async function hanldeLogout() {
    try {
      if (userRole == "employee") {
        const data = await apiClient.employeeLogOut();

        if (data?.success) {
          alert(data?.message);
          navigate("/");
        }
        if (!data?.success) {
          alert(data?.message);
        }
      } else if (userRole == "admin") {
        const data = await apiClient.adminLogOut();

        if (data?.success) {
          alert(data?.message);
          navigate("/admin/login");
        }
        if (!data?.success) {
          alert(data?.message);
        }
      }
    } catch (error) {}
  }
  return (
    <div className="flex justify-between  items-end p-6 ">
      <h1 className="text-2xl font-medium">
        Hello <br />{" "}
        <span className="text-3xl font-semibold"> {userData.name}👋</span>{" "}
      </h1>
      <button
        onClick={hanldeLogout}
        className="  py-3 px-5 rounded-sm text-lg font-medium  bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}

export default Header;
