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
import authorization from "../../middlewares/authorization.middleware.js";
import { endpoint } from "./company.authorization.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./company.validation.js";

const router = new Router();

router.use("/:companyId/jobs", jobController);

router.post(
  "/",
  validation(validators.addCompany),
  authentication(),
  uploadCloudFile(fileValidations.document).single("legalAttachment"),
  addCompany
);

router.patch(
  "/:companyId",
  validation(validators.updateCompany),
  authentication(),
  updateCompany
);

router.patch(
  "/:companyId/attach-hr",
  validation(validators.attachHrToCompany),
  authentication(),
  attachHrToCompany
);

router.delete(
  "/:companyId",
  validation(validators.softDeleteCompany),
  authentication(),
  softDeleteCompany
);

router.get(
  "/:companyId/jobs",
  validation(validators.getCompanyWithJobs),
  getCompanyWithJobs
);

router.get("/", validation(validators.searchCompanyByName), searchCompany);

router.post(
  "/:companyId/logo",
  validation(validators.uploadCompanyLogo),
  authentication(),
  uploadCloudFile(fileValidations.image).single("companyLogo"),
  uploadCompanyLogo
);

router.post(
  "/:companyId/cover",
  validation(validators.uploadCompanyCover),
  authentication(),
  uploadCloudFile(fileValidations.image).single("companyCover"),
  uploadCompanyCover
);

router.delete(
  "/:companyId/logo",
  validation(validators.deleteCompanyLogo),
  authentication(),
  deleteCompanyLogo
);

router.delete(
  "/:companyId/cover",
  validation(validators.deleteCompanyCover),
  authentication(),
  deleteCompanyCover
);

router.patch(
  "/:companyId/ban",
  validation(validators.companyBan),
  authentication(),
  authorization(endpoint.dashboard),
  companyBan
);

router.patch(
  "/:companyId/approve",
  validation(validators.companyApprove),
  authentication(),
  authorization(endpoint.dashboard),
  companyApprove
);

export default router;
