import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("🐦‍🔥DataBase Connected Successfully");
  } catch (error) {
    console.log(` Error connecting DataBase: ${error} `);
  }
};

export default connectDB;
