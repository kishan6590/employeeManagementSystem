import React from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";
import { UserDataProvider, useUserData } from "../../context/UserDataContext";

function ListTask() {
  const { userData, setUserData } = useUserData();
  console.log("userData", userData.tasks);
  return (
    <div
      id="taskList"
      className="flex  overflow-x-auto mt-4  gap-4  h-[300px] mx-6"
    >
      {userData.tasks.map((element) => {
        if (element.active)
          return <AcceptTask element={element} key={element._id} />;
        if (element.failed)
          return <FailedTask element={element} key={element._id} />;
        if (element.newTask)
          return <NewTask element={element} key={element._id} />;
        if (element.completed)
          return <CompleteTask element={element} key={element._id} />;
      })}
    </div>
  );
}

export default ListTask;
