import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGOURL, PORT } from "./config.js";
import User from "./Routes/userRoute.js";
import Favourte from "./Routes/favouritesRoute.js";
import dotenv from "dotenv";

const app = express();

// Middleware to parse JSON and URL-encoded data
// Middleware to enable CORS
dotenv.config();


app.use(
  cors({
    origin: "https://country-explorer-git-main-faizal2017s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", User); // User authentication routes
app.use("/api/favorites", Favourte); // Favorite management routes

//
const startServer = async () => {
  try {
    await mongoose.connect(MONGOURL); // Connect to MongoDB
    console.log("✅ Database Connected Successfully");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};

// Start the server
startServer();
