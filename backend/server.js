import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

// Database and routes imports
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import predictRoutes from "./routes/predict.route.js";
import resulttRoutes from "./routes/result.route.js";

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

dotenv.config();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/predict", predictRoutes);
app.use("/api/v1/result", resulttRoutes);

// Production configuration
if (process.env.NODE_ENV === "production") {
  // Static files
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Handle SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Development configuration
if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.send("Server running - Start frontend separately with npm run dev");
  });
}

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
