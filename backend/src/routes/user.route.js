import { Router } from "express";
import { login, logout, register } from "../controller/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single('avatar'), register);
router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);

export default router;