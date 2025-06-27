import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    newTask: {
      type: Boolean,
      default: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
    taskTitle: {
      type: String,
      trim: true,
    },
    taskDescription: {
      type: String,
      trim: true,
    },
    taskDate: {
      type: Date,
    },
    category: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", tasksSchema);
export default Task;
