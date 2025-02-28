import { Router } from "express";
import authentication from "../../middlewares/authentication.middleware.js";
import addCompany from "./services/addCompany.service.js";
import updateCompany from "./services/updateCompany.service.js";
import softDeleteCompany from "./services/softDeleteCompany.service.js";
import {
  fileValidations,
  uploadCloudFile,
} from "../../utils/multer/cloud.multer.js";
import uploadCompanyLogo from "./services/uploadCompanyLogo.service.js";
import uploadCompanyCover from "./services/uploadCompanyCoverPic.service.js";
import deleteCompanyLogo from "./services/deleteCompanyLogo.service.js";
import deleteCompanyCover from "./services/deleteCompanyCoverPic.service.js";
import getCompanyWithJobs from "./services/getCompanyWithJobs.service.js";
import searchCompany from "./services/searchCompany.service.js";
import attachHrToCompany from "./services/attachHrToCompany.service.js";
import jobController from "../job/job.controller.js";
import companyBan from "./services/companyBan.service.js";
import companyApprove from "./services/companyApprove.service.js";

const router = new Router();

router.use("/:companyId/jobs", jobController);

router.post("/", authentication(), addCompany);
router.patch("/:companyId", authentication(), updateCompany);
router.patch("/:companyId/attach-hr", authentication(), attachHrToCompany);
router.delete("/:companyId", authentication(), softDeleteCompany);
router.get("/:companyId/jobs", getCompanyWithJobs);
router.get("/", searchCompany);

router.post(
  "/:companyId/logo",
  authentication(),
  uploadCloudFile(fileValidations.image).single("companyLogo"),
  uploadCompanyLogo
);

router.post(
  "/:companyId/cover",
  authentication(),
  uploadCloudFile(fileValidations.image).single("companyCover"),
  uploadCompanyCover
);

router.delete("/:companyId/logo", authentication(), deleteCompanyLogo);

router.delete("/:companyId/cover", authentication(), deleteCompanyCover);

// /users/:userId/ban?action=ban
router.patch("/:companyId/ban", companyBan);

// POST /companies/:companyId/approve
router.patch("/:companyId/approve", companyApprove);

export default router;
