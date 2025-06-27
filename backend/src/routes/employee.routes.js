import express from "express";
import {
  employeeTaskStatusUpdate,
  getEmployee,
  loginEmplpoyee,
  logoutEmployee,
  registerEmployee,
} from "../controllers/employee.controller.js";
import isLoggedin from "../middleware/auth.middleware.js";
import {
  employeeTaskStatusUpdateValidator,
  loginValidator,
  registrationValidators,
} from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";

const router = express.Router();
router.post(
  "/register",
  registrationValidators(),
  validate,
  isLoggedin,
  registerEmployee
);
router.post(
  "/employeetaskupdate/:id",
  employeeTaskStatusUpdateValidator(),
  validate,
  isLoggedin,
  employeeTaskStatusUpdate
);
router.post("/login", loginValidator(), validate, loginEmplpoyee);
router.get("/getemployee", isLoggedin, getEmployee);
router.get("/logout", logoutEmployee);

export default router;
