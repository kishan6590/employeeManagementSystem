import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import apiClient from "../../service/apiClient";
import { useUserData } from "../context/UserDataContext";
import { useFilterEmployee } from "../context/FilterEmployeeContext";
function AddEmployeeModel({ showModel, setShowModel }) {
  if (!showModel) return null;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userData, setUserData } = useUserData();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { filterEmployee, setFilterEmployee } = useFilterEmployee();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient.createEmployee(email, password, name);

      if (data.success) {
        alert("Employee created successfully");

        setEmail("");
        setPassword("");
        setName("");
        setEmail("");
        const data = await apiClient.getEmployee();
        if (data.success) {
          setUserData(data);
        }
      }
      if (!data.success) {
        setError(data.message || data.errors[0].msg);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-transparent  w-screen h-screen flex  justify-center fixed top-3 z-20">
      <div className=" flex flex-col  bg-[#1c1c1c]  rounded-md mt-12 w-[30%]  mb-16 pl-7 pt-5">
        <RxCross1
          size={30}
          className="cursor-pointer text-end self-end  mr-5 "
          onClick={() => setShowModel(false)}
        />
        <div>
          <h2 className="text-5xl mb-6 text-cyan-500">Add Employee</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="" className="mb-1 text-xl">
            Employee Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter empoyee name"
            className="w-[92%] text-2xl  px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent mb-3 "
          />

          <label htmlFor="" className="mb-1 text-xl">
            Employee Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter employee email "
            className="w-[92%] text-2xl mb-3   px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent"
          />
          <label htmlFor="" className="mb-1 text-xl">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-[92%] text-2xl  px-3 py-2 outline-none border-2 border-emerald-700 rounded-md   bg-transparent"
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-emerald-700 mr-7 mt-5 rounded-sm text-2xl px-3 py-2 mb-2"
          >
            {loading ? "Add Employee..." : "Add Employee"}
          </button>
          {error && <h3 className="text-red-400 mt-2">{`Error : ${error}`}</h3>}
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModel;
