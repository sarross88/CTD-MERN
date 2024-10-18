//must be at the top fixes try/catch
import "express-async-errors";

//.Env file variables
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";

// Errors Package
import morgan from "morgan";
import cookieParser from "cookie-parser";

//Image cloud storage
import cloudinary from "cloudinary";

//Files
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//PATH
const __dirname = dirname(fileURLToPath(import.meta.url));

//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//ERROR MIDDLEWARE CUSTOM
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//Image cloud fonfig
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//External Middleware Morgan only for error logs, not in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//PUBLIC - Es6
app.use(express.static(path.resolve(__dirname, "./client/dist")));
// app.use(express.static(path.resolve(__dirname, "./public")));
// //Cookie reader middleware
app.use(cookieParser());
//Middleware-Built-in
app.use(express.json());

//test routes
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });

// Router- authenticate FIRST
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

//LOCAL BUILD
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./public", "index.html"));
// });
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//LAST ditch error Middleware added to all urls and methods
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
//Last last- by the existing route - valid request our typo internally/ catches the throw New Error
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
