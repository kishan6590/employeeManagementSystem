import React, { useState } from "react";
import { useUserData } from "../context/UserDataContext";
import { useFilterEmployee } from "../context/FilterEmployeeContext";

function AllTask({ element }) {
  const { userData, setUserData } = useUserData();
  const { filterEmployee, setFilterEmployee } = useFilterEmployee(
    
  );
  return (
    <div className="m-5 bg-[#1c1c1c] p-5   h-[25%] overflow-hidden     ">
      <div className="text-black mb-3 rounded-md flex justify-between py-2 px-3 bg-orange-400 font-bold text-lg">
        <h2>Employee Name</h2>
        <h3>New Task</h3>
        <h4>Active Task</h4>
        <h4>Completed</h4>
        <h4>Failed</h4>
      </div>
      {filterEmployee?.length == 0 ? (
        <div className=" w-full, h-16  flex justify-center items-center">
          <h1 className=" w-1/4 text-center text-3xl text-slate-700 font-semibold">
            Add Employee...
          </h1>
        </div>
      ) : (
        <div id="allTask" className="pb-6 h-full w-[101.3%] overflow-y-auto ">
          {filterEmployee?.map((element) => {
            return (
              <div
                className="  mb-3 rounded-md flex bg-transparent border border-amber-300 justify-between  py-2 px-3 bg-pink-500"
                key={element._id}
              >
                <h2 className="w-1/5 ">{element?.name}</h2>
                <h3 className=" w-1/5 text-center">
                  {element?.taskCounts.newTask}
                </h3>
                <h4 className="w-1/5  pl-[12%]">
                  {element?.taskCounts.active}
                </h4>
                <h4 className="w-1/5 pl-[16%]    ">
                  {element?.taskCounts.completed}
                </h4>
                <h4 className="w-1/5 text-end">{element?.taskCounts.failed}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllTask;
