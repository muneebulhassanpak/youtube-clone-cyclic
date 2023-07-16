import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;

const databaseConnection = async () => {
  try {
    console.log("mongodb://127.0.0.1:27017/youtube");
    await mongoose.connect("mongodb://127.0.0.1:27017/youtube");
  } catch (err) {
    console.log(err);
  }
};

export default databaseConnection;
