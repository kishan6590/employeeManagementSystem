import React from "react";

function NumberOfListTasks() {
  return (
    <div className=" flex gap-2 p-6" >
      <div className=" bg-red-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">0</h2>
        <h3 className="   text-2xl font-semibold">New Task </h3>
      </div>

       <div className=" bg-sky-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">0</h2>
        <h3 className="   text-2xl font-semibold">New Task </h3>
      </div>

       <div className=" bg-yellow-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">0</h2>
        <h3 className="   text-2xl font-semibold">New Task </h3>
      </div>

       <div className=" bg-slate-400 w-1/4 px-10 py-5 rounded-md">
        <h2 className="text-2xl font-semibold">0</h2>
        <h3 className="   text-2xl font-semibold">New Task </h3>
      </div>
    </div>
  );
}

export default NumberOfListTasks;
