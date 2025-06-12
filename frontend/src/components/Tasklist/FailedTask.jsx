import React from "react";

function FailedTask({ element }) {
  return (
    <div className="flex-shrink-0  rounded-lg bg-blue-300 h-full w-[320px] p-4">
      <div className="flex justify-between items-center py-2">
        <h3 className="bg-red-500 px-3 py-[2px] font-semibold rounded-md">
          High
        </h3>
        <h4 className="">{element.taskDate.split("T")[0]}</h4>
      </div>

      <h2 className="text-2xl font-bold mt-4">{element.taskTitle}</h2>
      <p className="text-justify mt-2">{element.taskTitle}</p>

      <div className="bg-red-500 py-1 rounded-md flex justify-center mt-4">
        <button>Failed</button>
      </div>
    </div>
  );
}

export default FailedTask;
