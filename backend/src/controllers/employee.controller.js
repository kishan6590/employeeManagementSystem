import Employee from "../models/Employee.model.js";
import jwt from "jsonwebtoken";
import Task from "../models/Task.model.js";
import bcrypt from "bcryptjs";
const loginEmplpoyee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({
      email,
    })
      .populate("tasks")
      .select("-password");

    if (!employee) {
      return res.status(400).json({
        message: "Invalid Username or Password",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Username or Password",
        success: false,
      });
    }

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    const isProduction = process.env.NODE_ENV == "production";

    const cookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      message: "Login Successfull",
      success: true,
      employee: {
        gamil: employee.gamil,
        tasks: employee.tasks,
        taskCounts: employee.taskCounts,
        name: employee.name,
        createdBy: employee.createdBy,
        createdAt: employee.createdAt,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Login Failed",
      success: false,
      error,
    });
  }
};

const logoutEmployee = async (req, res) => {
  const isProduction = process.env.NODE_ENV == "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
  };
  res.cookie("token", "", cookieOptions);
  return res.status(200).json({
    message: "Logged Out Successfully",
    success: true,
  });
};
const registerEmployee = async function (req, res) {
  const { name, email, password } = req.body;
  try {
    const existingEmpooyee = await Employee.findOne({
      email,
    });
    if (existingEmpooyee) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const lastEmployee = await Employee.findOne().sort({ employee_id: -1 });
    const id = lastEmployee ? lastEmployee.employee_id + 1 : 1;

    const employee = await Employee.create({
      employee_id: id,
      name,
      email,
      password,
      createdBy: req.user.id,
    });

    if (!employee) {
      return res.status(400).json({
        message: "Not able to register employee",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Employee registred successfully",
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Not able to register employee",
      success: false,
      error,
    });
  }
};

const getEmployee = async function (req, res) {
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({
      message: "Employee Id is required",
      success: false,
    });
  }
  const allEmployee = await Employee.find({ createdBy: id })
    .sort({ _id: 1 })
    .select("-password");
  if (!allEmployee) {
    return res.status(400).json({
      message: "Employee not found",
      success: false,
    });
  }
  return res.status(200).json({
    message: "Employees Found",
    success: true,
    allEmployee,
  });
};

const employeeTaskStatusUpdate = async function (req, res) {
  const { id } = req.params;
  const { action } = req.body;
  try {
    const employee = await Employee.findById(req.user.id).select("-password");
    if (!employee) {
      return res.status(400).json({
        message: "Employee not found",
        success: false,
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    }
    switch (action) {
      case "failed":
        task.failed = true;
        task.active = false;
        employee.taskCounts.active = employee.taskCounts.active - 1;
        employee.taskCounts.failed = employee.taskCounts.failed + 1;
        break;

      case "accept":
        task.active = true;
        task.newTask = false;
        employee.taskCounts.active = employee.taskCounts.active + 1;
        employee.taskCounts.newTask = employee.taskCounts.newTask - 1;
        break;
      case "completed":
        task.completed = true;
        task.active = false;
        employee.taskCounts.active = employee.taskCounts.active - 1;
        employee.taskCounts.completed = employee.taskCounts.completed + 1;
        break;
    }
    const updatedTask = await task.save();
    let updatedEmployee = await employee.save();
    updatedEmployee = await updatedEmployee.populate("tasks");
    return res.status(200).json({
      message: `Task marked as ${action}`,
      success: true,
      updatedEmployee,
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

export {
  loginEmplpoyee,
  logoutEmployee,
  registerEmployee,
  getEmployee,
  employeeTaskStatusUpdate,
};
