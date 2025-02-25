import { Router } from "express";
import getUserProfile from "./services/getUserProfile.service.js";
import getPublicProfile from "./services/getPublicProfile.service.js";
import authentication from "../../middlewares/authentication.middleware.js";
import softDelete from "./services/softDeleteAccount.service.js";

const router = new Router();

router.get("/profile", authentication(), getUserProfile);
router.get("/public-profile/:profileId", authentication(), getPublicProfile);
router.patch("/soft-delete", authentication(), softDelete);

export default router;
