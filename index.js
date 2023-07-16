import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

databaseConnection();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

//Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/videos", videoRoutes);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

const port = process.env.PORT || 3002;
mongoose.connection.once("open", () => {
  console.log("connection with database successful");
  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(
    "Error connecting to the database, we won't start server ",
    error
  );
  process.exit(1);
});
