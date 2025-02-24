import { Router } from "express";
import signUp from "./services/signup.service.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./auth.validation.js";

const router = new Router();

router.post("/signup", validation(validators.signUp), signUp);

export default router;
