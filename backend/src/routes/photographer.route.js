import { updatePhotographerProfile } from "../controller/photographer.controller.js";
import { Router } from "express";
import { authorizedRole, verifyToken } from "../middlewares/auth.middleware.js";
import { addImageToPortfolio, deleteImageFromPortfolio, getAllPortfolioImage } from "../controller/portfolio.controller.js";
import { deleteRating, updateRating } from "../controller/rating.controller.js";
import { toggleLike } from "../controller/like.controller.js";

const router = Router();

router.route("/edit-profile").patch(verifyToken, authorizedRole(["photographer"]), updatePhotographerProfile);

router.route("/like").post(verifyToken, authorizedRole(["photographer"]), toggleLike);

router.route("/rating").post(verifyToken, authorizedRole(["photographer"]), updateRating);
router.route("/rating/delete").delete(verifyToken, authorizedRole(["photographer"]), deleteRating);

router.route("/portfolio/add-img").post(verifyToken, authorizedRole(["photographer"]), addImageToPortfolio);
router.route("/portfolio/delete-img").delete(verifyToken, authorizedRole(["photographer"]), deleteImageFromPortfolio);
router.route("/portfolio/get-all").get(verifyToken, authorizedRole(["photographer"]), getAllPortfolioImage);

export default router;
