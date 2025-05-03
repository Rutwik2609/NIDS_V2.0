import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import predictRoutes from "./routes/predict.route.js";
import resulttRoutes from "./routes/result.route.js";

const app = express();
const PORT = 5000;

const __dirname =path.resolve();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", // Explicitly allow frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle root route
app.get('/', (req, res) => {
  res.send('Service is running 🚀');
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/predict", predictRoutes);
app.use("/api/v1/result", resulttRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
