import { Router } from "express";
import { generateNewRefreshToken, login, logout, register } from "../controller/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { authorizedRole, verifyToken } from "../middlewares/auth.middleware.js";
import { toggleLike } from "../controller/like.controller.js";
import { updateRating, deleteRating} from "../controller/rating.controller.js";

const router = Router();

router.route("/register").post(upload.single('avatar'), register);
router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
router.route("/refresh-token").post(generateNewRefreshToken);

router.route("/like").post(verifyToken, authorizedRole(["user"]), toggleLike);

router.route("/rating").post(verifyToken, authorizedRole(["user"]), updateRating);
router.route("/rating/delete").delete(verifyToken, authorizedRole(["user"]), deleteRating);

export default router;