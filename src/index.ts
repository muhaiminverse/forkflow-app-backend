import express, { type Request, type Response } from "express";
import cors = require("cors");
import "dotenv/config";
import mongoose = require("mongoose");
import myUserRoute = require("./routes/MyUserRoutes");

mongoose.connect((process.env.MONGODB_CONNECTION_STRING as string) || "").then(() => {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// User endpoints
app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});