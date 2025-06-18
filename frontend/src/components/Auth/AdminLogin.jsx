import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../service/apiClient";
import { jsx } from "react/jsx-runtime";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData, setUserData } = useUserData();

  const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiClient.adminLogin(email, password);
      if (data?.success) {
        localStorage.setItem("isAdminLoggedIn", true);
        setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn"));

        navigate("/admin/dashboard");
        // setUserData(data.admin);
        setUserData(data.admin);
        localStorage.setItem("data", JSON.stringify(data.admin));
        setEmail("");
        setPassword("");
      }
      if (!data?.success) {
        setError(data?.message || "Login Failed");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" h-screen w-screen flex items-center justify-center  ">
      <form
        onSubmit={(e) => handleSubmit(e)}
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
        <div className=" w-full pt-2 px-3">
          <h3 className=" w-full ">
            Not registered yet? <Link to="/signup"className="text-blue-400">Register</Link>
          </h3>

            <Link
              to="/"
              className=" transform translate-x-20 mt-1 text-blue-400"
            >
              Login as employee
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
