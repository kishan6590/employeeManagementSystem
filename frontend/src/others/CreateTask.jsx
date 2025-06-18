import React, { useState } from "react";
import Select from "react-select";
import { useUserData } from "../context/UserDataContext";
import apiClient from "../../service/apiClient";

function CreateTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState("");
  const [assignTo, setAssignTo] = useState(null);
  const [category, setCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState();
  const { userData, setUserData } = useUserData();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("false");

  let options = userData.allEmployee?.map((element) => {
    return {
      value: element?._id,
      label: element?.name,
    };
  });

  const customStyle = {
    option: (baseStyles, state) => {
      return {
        ...baseStyles,
        backgroundColor: "#1c1c1c",
        border: "1px solid white",
        marginBottom: "2px",
      };
    },
    menu: function (baseStyles, state) {
      return {
        ...baseStyles,
        backgroundColor: "#1c1c1c",
        maxHeight: "15px",
      };
    },
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      maxHeight: "130px",
    }),
    control: function (baseStyles, state) {
      return {
        ...baseStyles,
        color: "#ffff",
        backgroundColor: "#1c1c1c",
        outline: "none",
        boxShadow: "none",
        border: state.isFocused ? "1px solid #ffff" : "",
        "&:hover": {
          border: state.isFocused ? "1px solid #fffF" : "",
        },
      };
    },

    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "#ffff",
    }),
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      taskTitle,
      date,
      assignTo: assignTo.value,
      category,
      taskDescription,
    };
    try {
      const res = await apiClient.createTask(data);
      if (res.success) {
        alert(res.message);
        setDate("");
        setAssignTo(null);
        setCategory("");
        setTaskDescription("");
        setTaskTitle("");

        const data = await apiClient.getEmployee();
        if (data.success) {
          setUserData(data);
        }
      }
      if (!res.success) {
        alert(res.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="mx-5 
       bg-[#1c1c1c] "
    >
      <form className="flex p-5 " onSubmit={handleSubmit}>
        <div className="flex flex-col w-1/2  pr-32">
          <label className="mb-1" htmlFor="">
            Task Title
          </label>

          <input
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            placeholder="Make a UI design"
            className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
          />

          <label htmlFor="" className="mb-1">
            Date
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            required
            value={date}
            type="date"
            placeholder="dd/mm/yyyy"
            className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
          />
          <label htmlFor="" className="mb-1">
            Assign to
          </label>
          <Select
            required
            value={assignTo}
            onChange={setAssignTo}
            className="mb-3"
            styles={customStyle}
            options={options}
            placeholder="Select Employee"
            isClearable
            // value={selectedOption}
            // onChange={setSelectedOption}
          />
          <label htmlFor="" className="mb-1">
            Category
          </label>
          <input
            required
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            placeholder="desing, dev, etc"
            className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
          />
        </div>
        <div className="w-1/2  flex flex-col pl-28  pr-5 ">
          <div className="flex flex-col ">
            <label htmlFor="" className="mb-1">
              Description
            </label>
            <textarea
              required
              rows={7}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className=" p-2 mb-5 outline-none rounded border bg-transparent"
              name=""
              id=""
            ></textarea>
          </div>
          <button type="submit" className="bg-emerald-500 py-3 rounded-md px-6">
            Create task
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
