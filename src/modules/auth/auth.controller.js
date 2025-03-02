import { Router } from "express";
import signUp from "./services/signup.service.js";
import confirmEmail from "./services/confirmEmail.service.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./auth.validation.js";
import signIn from "./services/signin.service.js";
import authenticateWithGoogle from "./services/googleAuth.service.js";
import forgotPassword from "./services/forgotPassword.service.js";
import resetPassword from "./services/resetPassword.service.js";
import refreshToken from "./services/refreshToken.service.js";

const router = new Router();

router.post("/signup", validation(validators.signUp), signUp);
router.patch(
  "/confirm-email",
  validation(validators.confirmEmail),
  confirmEmail
);
router.post("/signin", validation(validators.signIn), signIn);
router.post(
  "/google",
  validation(validators.authenticateWithGoogle),
  authenticateWithGoogle
);
router.post(
  "/forgot-password",
  validation(validators.forgotPassword),
  forgotPassword
);
router.patch(
  "/reset-password",
  validation(validators.resetPassword),
  resetPassword
);
router.get("/refresh-token", refreshToken);

export default router;
