import mongoose from "mongoose";
import Admin from "../models/Admin.model.js";
import Employee from "../models/Employee.model.js";
import Task from "../models/Task.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
        success: false,
      });
    }
    const latestAdmin = await Admin.findOne().sort({ admin_id: -1 });
    const id = latestAdmin ? latestAdmin.admin_id + 1 : 1;


    const employee = await Admin.create({
      email,
      password,
      name,
      admin_id: id,
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in registering admin",
      success: false,
      error,
    });
  }
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Incorrect Email or Password",

        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    const allEmployee = await Employee.find({
      createdBy: admin._id,
    })
      .sort({ _id: 1 })
      .select("-password");

    if (!allEmployee) {
      return res.status(400).json({
        message: "Employee not found ",
        success: false,
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    const cookieOption = {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 25 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOption);
    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      admin: {
        name: admin.name,
        email,
        allEmployee,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Login failed ",
      success: false,
      error,
    });
  }
};
const logOutAdmin = async (req, res) => {
  try {
    const cookieOption = {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    };
    res.cookie("token", "", cookieOption);
    return res.status(200).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error is Logging Out",
      error,
      success: false,
    });
  }
};
const deleteUser = async () => {};

export { loginAdmin, logOutAdmin, createAdmin };
