import React from "react";
import { useUserData } from "../../context/UserDataContext";
import apiClient from "../../../service/apiClient";

function AcceptTask({ element }) {
  const { userData, setUserData } = useUserData();
  async function handleAction(id, action) {
    const data = await apiClient.taskUpdate(id, action);
    if (data.success) {
      localStorage.setItem("data", JSON.stringify(data.updatedEmployee));
      setUserData(data?.updatedEmployee);
    }
  }
  return (
    <div className="flex-shrink-0  rounded-lg bg-orange-400 h-full w-[320px] p-4">
      <div className="flex justify-between items-center py-2">
        <h3 className="bg-red-500 px-3 py-[2px] font-semibold rounded-md">
          High
        </h3>
        <h4 className=""> {element.taskDate.split("T")[0]}</h4>
      </div>

      <h2 className="text-2xl font-bold mt-4">{element.taskTitle}</h2>
      <p className="text-justify mt-2">{element.taskTitle}</p>
      <div className=" flex justify-between mt-3">
        <button
          className="bg-green-600 px-2 py-1 rounded-md"
          onClick={() => {
            handleAction(element._id, "completed");
          }}
        >
          Mark as Completed
        </button>
        <button
          className="bg-red-500 px-2 py-1 rounded-md"
          onClick={() => {
            handleAction(element._id, "failed");
          }}
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
}

export default AcceptTask;
