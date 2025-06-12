import React from "react";

function CompleteTask({ element }) {
  return (
    <div className="flex-shrink-0  rounded-lg bg-green-400 h-full w-[320px] p-4">
      <div className="flex justify-between items-center py-2">
        <h3 className="bg-red-500 px-3 py-[2px] font-semibold rounded-md">
          High
        </h3>
        <h4 className=""> {element.taskDate.split("T")[0]}</h4>
      </div>

      <h2 className="text-2xl font-bold mt-4">{element.taskTitle}</h2>
      <p className="text-justify mt-2">{element.taskTitle}</p>
      <div className="flex justify-center rounded-md items-center py-1 bg-green-600 mt-4">
        <button className=""> Complete</button>
      </div>
    </div>
  );
}

export default CompleteTask;
