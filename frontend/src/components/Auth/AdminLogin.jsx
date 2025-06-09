import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
  }
  return (
    <div className=" h-screen w-screen flex items-center justify-center  ">
      <form className=" rounded-2xl flex flex-col  items-center justify-center border-2  border-emerald-500 p-14">
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

        <Link
          to="/"
          className=" transform translate-x-20 mt-1 text-slate-300"
        >
          Login as employee
        </Link>
      </form>
    </div>
  );
}

export default AdminLogin;
