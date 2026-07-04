import express, { type Request, type Response } from "express";
import cors = require("cors");
import "dotenv/config";
import mongoose = require("mongoose");
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import {v2 as cloudinary} from "cloudinary";

// mongoDB connection
mongoose.connect((process.env.MONGODB_CONNECTION_STRING as string) || "").then(() => {
  console.log("Connected to MongoDB");
});

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// User endpoints
app.use("/api/my/user", myUserRoute);
// restaurant endpoints
app.use("/api/my/restaurant", myRestaurantRoute);


app.listen(7000, () => {
  console.log("Server is running on port 7000");
});