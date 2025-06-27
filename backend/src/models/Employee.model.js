import bcrypt from "bcryptjs";
import mongoose, { mongo } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    taskCounts: {
      active: { type: Number, default: 0 },
      newTask: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
      failed: { type: Number, default: 0 },
    },
    tasks: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Task",
        },
      ],
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Admin",
      required: true,
    },
    image: {
      type: String,
    },
  },

  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
