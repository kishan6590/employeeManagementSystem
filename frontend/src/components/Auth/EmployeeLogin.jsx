import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../service/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();
  const {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isEmployeeLoggedIn,
    setIsEmployeeLoggedIn,
  } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await apiClient.employeeLogin(email, password);
      if (data?.success) {
        localStorage.setItem("isEmployeeLoggedIn", JSON.stringify(true));

        setIsEmployeeLoggedIn(true);
        navigate("/employee/dashboard");

        localStorage.setItem("data", JSON.stringify(data.employee));
        setUserData(data.employee);

        setEmail("");
        setPassword("");
      } else if (!data?.success) {
        setError(data?.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" h-screen w-screen flex items-center justify-center  ">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" rounded-2xl flex flex-col  items-center justify-center border-2  border-emerald-500 p-14"
      >
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Your Email"
          className="bg-transparent border-2 border-emerald-500 placeholder:text-gray-600 mb-4  text-2xl  outline-none pl-5 py-3 rounded-full"
          type="email"
        />
        <input
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Your Password"
          className="bg-transparent border-2 border-emerald-500 placeholder:text-gray-600  text-2xl  outline-none pl-5 py-3 rounded-full "
          type="password"
        />
        <button
          className="w-full border-none w- text-2xl bg-emerald-700 rounded-full  px-auto py-2  mt-4"
          type="submit"
        >
          Log in
        </button>
        {error && <h3 className="text-red-400 mt-2">{`Error : ${error}`}</h3>}

        <Link
          to="/admin/login"
          className=" transform translate-x-20 mt-1 text-slate-300"
        >
          Login as admin
        </Link>
      </form>
    </div>
  );
}

export default EmployeeLogin;
