import { Router } from "express";
import signUp from "./services/signup.service.js";
import confirmEmail from "./services/confirmEmail.service.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./auth.validation.js";
import signIn from "./services/signin.service.js";
import signInWithGoogle from "./services/signinWithGoogle.service.js";

const router = new Router();

router.post("/signup", validation(validators.signUp), signUp);
router.patch("/confirm-email", confirmEmail);
router.post("/signin", signIn);
router.post("/signin-with-google", signInWithGoogle);

export default router;
