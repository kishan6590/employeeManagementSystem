import React from "react";
import Header from "../../others/Header";
import CreateTask from "../../others/CreateTask";
import AllTask from "../../others/AllTask";

function AdminDashboard() {
  return (
    <div className="h-screen w-full ">
      <Header userRole={"admin"} />
      <CreateTask />
    <AllTask/>
    </div>
  ); 
}

export default AdminDashboard;
