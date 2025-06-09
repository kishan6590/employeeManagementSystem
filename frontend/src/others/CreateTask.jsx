import React from 'react'

function CreateTask() {
  return (
     <div
        className="mx-5 
       bg-[#1c1c1c] "
      >
        <form className="flex p-5 ">
          <div className="flex flex-col w-1/2  pr-32">
            <label className="mb-1" htmlFor="">Task Title</label>
            <input
              type="text"
              placeholder="Make a UI design"
              className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
            />

            <label htmlFor=""  className="mb-1">Date </label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
            />
            <label htmlFor=""  className="mb-1">Assign to</label>
            <input
              type="text"
              placeholder="employee name"
              className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
            />
            <label htmlFor=""  className="mb-1">Category</label>
            <input
              type="text"
              placeholder="desing, dev, etc"
              className="mb-3 p-1 outline-none rounded placeholder:text-gray-600 bg-transparent border"
            />
          </div>
          <div className="w-1/2  flex flex-col pl-28  pr-5 ">
            <div className="flex flex-col ">
              <label htmlFor="" className='mb-1'>Description</label>
              <textarea  rows={7}  className=" p-2 mb-5 outline-none rounded border bg-transparent" name="" id=""></textarea>
            </div>
            <button className="bg-emerald-500 py-3 rounded-md px-6"> Create task</button>
          </div>
        </form>
      </div>
  )
}

export default CreateTask