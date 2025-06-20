import React from "react";
import apiClient from "../../../service/apiClient.js";
import { useUserData } from "../../context/UserDataContext.jsx";
function NewTask({ element }) {
  const { userData, setUserData } = useUserData();
  async function handleAction(id) {
    const data = await apiClient.taskUpdate(id, "accept");
    if (data.success) {
      localStorage.setItem("data", JSON.stringify(data.updatedEmployee));
      setUserData(data?.updatedEmployee);
    }
  }
  return (
    <div className="flex-shrink-0  rounded-lg bg-sky-300 h-full w-[320px] p-4">
      <div className="flex justify-between items-center py-2">
        <h3 className="bg-red-500 px-3 py-[2px] font-semibold rounded-md">
          High
        </h3>
        <h4 className=""> {element.taskDate.split("T")[0]}</h4>
      </div>

      <h2 className="text-2xl font-bold mt-4">{element.taskTitle}</h2>
      <p className="text-justify mt-2">{element.taskTitle}</p>
      <div className="bg-blue-500 justify-center items-center rounded-md mt-4 py-1 flex">
        <button
          onClick={() => {
            handleAction(element._id);
          }}
        >
          Accept Task
        </button>
      </div>
    </div>
  );
}

export default NewTask;
