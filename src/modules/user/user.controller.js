import { Router } from "express";
import getMyAccount from "./services/getMyAccount.service.js";
import authentication from "../../middlewares/authentication.middleware.js";

const router = new Router();

router.get("/get", authentication(), getMyAccount);

export default router;
