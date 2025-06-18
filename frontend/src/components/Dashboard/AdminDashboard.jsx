import React, { useEffect, useState } from "react";
import Header from "../../others/Header";
import CreateTask from "../../others/CreateTask";
import AllTask from "../../others/AllTask";
import { useUserData } from "../../context/UserDataContext";
import AddEmployeeModel from "../../others/AddEmployeeModel";
import { useFilterEmployee } from "../../context/FilterEmployeeContext";
function AdminDashboard() {
  const { userData, setUserData } = useUserData();
  const [showModel, setShowModel] = useState(false);
  const { filterEmployee, setFilterEmployee } = useFilterEmployee();
  useEffect(() => {
    setFilterEmployee(userData?.allEmployee);
  }, [userData?.allEmployee]);
  const [searchValue, setSearchValue] = useState();

  function handleSearch(e) {
    e.preventDefault();
    const searchKey = e.target.value.toLowerCase();
    setSearchValue(searchKey);
    const filterd = userData.allEmployee.filter((employee) => {
      return employee.name.toLowerCase().includes(searchKey);
    });
    setFilterEmployee(filterd);
  }
  return (
    <>
      <div className={showModel ? "blur-lg" : " h-screen w-full "}>
        <Header userRole={"admin"} />

        <div className="bg-[#1c1c1c]  flex m-5 rounded-sm p-5 items-center justify-between mt-4 mb-4 ">
          <div className=" p-2  bg-slate-500   rounded-md">
            <h3>Total Employees</h3>{" "}
            <h2 className="text-2xl">
              {userData?.allEmployee?.length <= 10
                ? `0${userData?.allEmployee?.length}`
                : userData?.allEmployee?.length}
            </h2>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => {
                setShowModel(true);
              }}
              className="bg-sky-600 py-1 px-2 text-xl rounded-md"
            >
              Add Employee
            </button>
            <input
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search employee"
              type="text"
              className="rounded pl-4 text-black"
            />
          </div>
        </div>
        <CreateTask />

        <AllTask />
      </div>
      <AddEmployeeModel setShowModel={setShowModel} showModel={showModel} />
    </>
  );
}

export default AdminDashboard;
