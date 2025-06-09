import React from "react";

function Header() {
  return (
    <div className="flex justify-between  items-end p-6 ">
      <h1 className="text-2xl font-medium">
        Hello <br /> <span className="text-3xl font-semibold">Kishan👋</span>{" "}
      </h1>
      <button className="  py-3 px-5 rounded-sm text-lg font-medium  bg-red-600">
        Log Out
      </button>
    </div>
  );
}

export default Header;
