import express, { Router } from "express";
import { createUser, loginUser , logoutUser} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMe } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/me",protectRoute,getMe);

export default router;