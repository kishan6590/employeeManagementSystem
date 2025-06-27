import express from "express";
import { createTask } from "../controllers/task.controller.js";
import isLoggedin from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { taskCreateValidator } from "../validators/index.js";
const router = express.Router();

router.post("/create", taskCreateValidator(), validate, isLoggedin, createTask);
export default router;
