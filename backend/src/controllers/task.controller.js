import Employee from "../models/Employee.model.js";
import Task from "../models/Task.model.js";
const createTask = async (req, res) => {
  const { taskTitle, taskDate, taskDescription, category, assignedTo } =
    req.body;

  try {
    const task = await Task.create({
      taskTitle,
      taskDate,
      taskDescription,
      category,
      assignedTo,
      createdBy: req.user.id,
    });
    if (!task) {
      return res.status(400).json({
        message: "Something went wrong while creating the task",
        success: false,
      });
    }
    const employee = await Employee.findById(assignedTo);
    if (!employee) {
      return res.status(400).json({
        message: "Employee not exist",
        success: false,
      });
    }
    employee.tasks.push(task._id);
    const count =
      employee.taskCounts.newTask == 0 ? 1 : employee.taskCounts.newTask + 1;
    employee.taskCounts.newTask = count;
    const allEmployee = await Employee.find({ createdBy: req.user.id });
    await employee.save();
    return res.status(200).json({
      message: "Task created successfully",
      success: "true",
      task,
      allEmployee,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Task not created ",
      error,
      success: false,
    });
  }
};

const deleteTask = async function () {
  const id = req.query;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(400).json({
        message: "task not found",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ message: "Task Deleted Successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting the task",
      success: false,
      error,
    });
  }
};

export { createTask, deleteTask };
