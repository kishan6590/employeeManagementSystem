import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../service/apiClient";

function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiClient.createAdmin(email, password, name);
      if (data.success) {
        navigate("/admin/dashboard");
        alert("Registeration Successfull");
      }
      if (!data.success) {
        setError(data.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-[#1c1c1c] w-screen h-screen flex justify-center ">
      <div className=" flex flex-col border  border-emerald-700 rounded-md w-[30%] mt-16 mb-14 pl-7 pt-5">
        <div>
          <h2 className="text-5xl mb-3">Signup</h2>
          <p className="text-slate-500 mb-5">It just takes 30 seconds </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="" className="mb-1 text-xl">
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-[92%] text-2xl  px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent mb-3 "
          />

          <label htmlFor="" className="mb-1 text-xl">
            Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-[92%] text-2xl mb-3   px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent"
          />
          <label htmlFor="" className="mb-1 text-xl">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-[92%] text-2xl  px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent"
          />
          <button
            type="submit"
            className="bg-emerald-700 mr-7 mt-5 rounded-sm text-2xl px-3 py-2 mb-2"
          >
            Create Account
          </button>
        </form>
        <h3 className="mb-6-  text-end pr-8">
          Already have Account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default AdminSignup;
