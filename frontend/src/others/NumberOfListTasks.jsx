import React from "react";
import { useUserData } from "../context/UserDataContext";

function NumberOfListTasks() {
  const { userData, setUserData } = useUserData();
  return (
    <div className=" flex gap-2 p-6">
      <div className=" bg-red-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">
          {userData.taskCounts.newTask}
        </h2>
        <h3 className="   text-2xl font-semibold">New Task </h3>
      </div>

      <div className=" bg-sky-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">
          {userData.taskCounts.completed}
        </h2>
        <h3 className="   text-2xl font-semibold">Completed Task </h3>
      </div>

      <div className=" bg-yellow-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">{userData.taskCounts.active}</h2>
        <h3 className="   text-2xl font-semibold">Accepted Task </h3>
      </div>

      <div className=" bg-slate-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">{userData.taskCounts.failed}</h2>
        <h3 className="   text-2xl font-semibold">Failed Task </h3>
      </div>
    </div>
  );
}

export default NumberOfListTasks;
