import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import connectDB from "./db/index.js";
import employeeRoutes from "./routes/employee.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/task", taskRoutes);
connectDB();  
app.listen(PORT, () => {
  console.log(`🐦‍🔥Server is running on ${PORT}`);
});
