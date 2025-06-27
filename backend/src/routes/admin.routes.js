import express from "express";
import {
  createAdmin,
  loginAdmin,
  logOutAdmin,
} from "../controllers/admin.controller.js";
import { loginValidator, registrationValidators } from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
  
const router = express.Router();
router.post("/register", registrationValidators(), validate, createAdmin);
router.post("/login", loginValidator(), validate, loginAdmin);
router.get("/logout", logOutAdmin);
export default router;
