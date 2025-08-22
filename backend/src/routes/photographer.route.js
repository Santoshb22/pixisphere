import { updatePhotographerProfile } from "../controller/photographer.controller.js";
import { Router } from "express";
import { authorizedRole, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/edit-profile").patch(verifyToken, authorizedRole(["photographer"]), updatePhotographerProfile);

export default router;
