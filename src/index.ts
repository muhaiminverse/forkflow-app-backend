import express, { type Request, type Response } from "express";
import cors = require("cors");
import "dotenv/config";
import mongoose = require("mongoose");
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import {v2 as cloudinary} from "cloudinary";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";
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
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({type: "*/*"}));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// User endpoints
app.use("/api/my/user", myUserRoute);
// restaurant endpoints
app.use("/api/my/restaurant", myRestaurantRoute);
// search endpoints
app.use("/api/restaurant", restaurantRoute);
// order endpoints
app.use("/api/order", orderRoute);


app.listen(7000, () => {
  console.log("Server is running on port 7000");
});