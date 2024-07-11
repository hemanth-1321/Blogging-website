import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import { DBconnection } from "./DB.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
DBconnection();
const port = process.env.PORT || 1000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", routes);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
