import React from "react";
import Header from "../../others/Header";
import NumberOfListTasks from "../../others/NumberOfListTasks";
import ListTask from "../Tasklist/ListTask";

export default function EmployeeDashboard() {
  return (
    <div className="h-screen bg-[#1c1c1c]">
      <Header />
      <NumberOfListTasks />
      <ListTask />
    </div>
  );
}
