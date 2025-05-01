import express from "express";

import { resultController } from "../controllers/result.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/view-result',resultController);

export default router;