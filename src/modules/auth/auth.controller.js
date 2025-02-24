import { Router } from "express";
import signUp from "./services/signup.service.js";
import confirmEmail from "./services/confirmEmail.service.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./auth.validation.js";

const router = new Router();

router.post("/signup", validation(validators.signUp), signUp);
router.patch("/confirm-email", confirmEmail);

export default router;
