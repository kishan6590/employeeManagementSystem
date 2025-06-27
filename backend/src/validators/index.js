import { body, param } from "express-validator";

const registrationValidators = function () {
  return [
    body("email")
      .notEmpty()
      .trim()
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 character")
      .isLength({ max: 8 })
      .withMessage("Password can not exceed to 8 character"),
    body("name").notEmpty().withMessage("Name is required").trim(),
  ];
};

const loginValidator = function () {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters")
      .isLength({ max: 8 })
      .withMessage("Password can not exceed 8 character"),
  ];
};

const taskCreateValidator = function () {
  return [
    body("taskTitle").notEmpty().withMessage("Task Title is required").trim(),
    body("taskDescription")
      .notEmpty()
      .withMessage("Task Description is required")
      .trim(),
    body("taskDate").notEmpty().withMessage("Task Date is required"),
    body("category").notEmpty().withMessage("Category is required").trim(),
    body("assignedTo").notEmpty().withMessage("Assigned to is required"),
  ];
};
const employeeTaskStatusUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("id can not be empty"),
    body("action").notEmpty().withMessage("Action can not be empty"),
  ];
};

export {
  registrationValidators,
  loginValidator,
  taskCreateValidator,
  employeeTaskStatusUpdateValidator,
};
