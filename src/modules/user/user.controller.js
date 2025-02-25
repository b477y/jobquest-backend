import { Router } from "express";
import getUserProfile from "./services/getUserProfile.service.js";
import authentication from "../../middlewares/authentication.middleware.js";

const router = new Router();

router.get("/get", authentication(), getUserProfile);

export default router;
