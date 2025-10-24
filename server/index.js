import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Buddy ...."))
  .catch(() => console.log("❌ Bhari Mistake ho gya ..."));

//Route
app.get("/", (req, res) => {
  res.send("Server is Running.....");
});

// Server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
