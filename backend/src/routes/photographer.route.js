import { updatePhotographerProfile } from "../controller/photographer.controller.js";
import { Router } from "express";
import { authorizedRole, verifyToken } from "../middlewares/auth.middleware.js";
import { addImageToPortfolio, deleteImageFromPortfolio, getAllPortfolioImage } from "../controller/portfolio.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/edit-profile").patch(verifyToken, authorizedRole(["photographer"]), updatePhotographerProfile);

router.route("/portfolio/add-img").post(verifyToken, authorizedRole(["photographer"]), upload.single("portfolio"), addImageToPortfolio);
router.route("/portfolio/delete-img").delete(verifyToken, authorizedRole(["photographer"]), deleteImageFromPortfolio);
router.route("/portfolio/all").get(verifyToken, authorizedRole(["photographer"]), getAllPortfolioImage);

export default router;
