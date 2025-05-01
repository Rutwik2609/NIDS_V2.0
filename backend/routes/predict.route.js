import express from "express";
import multer from "multer";
import {
  predictController,
  bulkPredictController,
} from "../controllers/predict.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Single prediction route
router.post("/result", protectRoute, predictController);

// Bulk prediction route
router.post(
  "/bulk",
  protectRoute,
  upload.single("file"),
  bulkPredictController
);

export default router;
