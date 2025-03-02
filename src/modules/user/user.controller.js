import { Router } from "express";
import getUserProfile from "./services/getUserProfile.service.js";
import getPublicProfile from "./services/getPublicProfile.service.js";
import authentication from "../../middlewares/authentication.middleware.js";
import softDelete from "./services/softDeleteAccount.service.js";
import uploadProfilePic from "./services/uploadProfilePic.service.js";
import {
  uploadCloudFile,
  fileValidations,
} from "../../utils/multer/cloud.multer.js";
import uploadProfileCover from "./services/uploadCoverPic.service.js";
import deleteProfilePic from "./services/deleteProfilePic.service.js";
import deleteCoverPic from "./services/deleteCoverPic.service.js";
import updateAccount from "./services/updateAccount.service.js";
import updatePassword from "./services/updatePassword.service.js";
import userBan from "./services/userBan.service.js";
import authorization from "../../middlewares/authorization.middleware.js";
import { endpoint } from "./user.authorization.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./user.validation.js";

const router = new Router();

router.get("/profile", authentication(), getUserProfile);

router.get(
  "/public-profile/:profileId",
  validation(validators.publicProfile),
  authentication(),
  getPublicProfile
);

router.delete("/soft-delete", authentication(), softDelete);

router.patch(
  "/profile/upload-profile-picture",
  validation(validators.image),
  authentication(),
  uploadCloudFile(fileValidations.image).single("profilePic"),
  uploadProfilePic
);

router.patch(
  "/profile/upload-profile-cover",
  validation(validators.image),
  authentication(),
  uploadCloudFile(fileValidations.image).single("profileCover"),
  uploadProfileCover
);

router.delete("/profile/profile-picture", authentication(), deleteProfilePic);

router.delete("/profile/profile-cover", authentication(), deleteCoverPic);

router.patch(
  "/profile",
  authentication(),
  validation(validators.updateAccount),
  updateAccount
);

router.patch(
  "/profile/update-password",
  validation(validators.updatePassword),
  authentication(),
  updatePassword
);

router.patch(
  "/:userId/ban",
  authentication(),
  validation(validators.userBan),
  authorization(endpoint.dashboard),
  userBan
);

export default router;
