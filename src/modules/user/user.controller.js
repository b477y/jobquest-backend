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

const router = new Router();

router.get("/profile", authentication(), getUserProfile);
router.get("/public-profile/:profileId", authentication(), getPublicProfile);
router.patch("/soft-delete", authentication(), softDelete);
router.patch(
  "/profile/upload-profile-picture",
  authentication(),
  uploadCloudFile(fileValidations.image).single("profilePic"),
  uploadProfilePic
);
router.patch(
  "/profile/upload-profile-cover",
  authentication(),
  uploadCloudFile(fileValidations.image).single("profileCover"),
  uploadProfileCover
);

export default router;
