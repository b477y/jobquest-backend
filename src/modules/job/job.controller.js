import { Router } from "express";
import authentication from "../../middlewares/authentication.middleware.js";
import addJob from "./services/addJob.service.js";
import updateJob from "./services/updateJob.service.js";
import deleteJob from "./services/deleteJob.service.js";
import getCompanyJobs from "./services/getCompanyJobs.service.js";
import filterJobs from "./services/filterJobs.service.js";
import { applyToJob } from "./services/applyToJob.service.js";
import {
  fileValidations,
  uploadCloudFile,
} from "../../utils/multer/cloud.multer.js";
import { getApplicationsForJob } from "./services/getJobApplications.service.js";
import { updateApplicationStatus } from "./services/manageApplicationStatus.service.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as validators from "./job.validation.js";

const router = Router({ mergeParams: true });

router.post("/", validation(validators.addJob), authentication(), addJob);

router.patch(
  "/:jobId",
  validation(validators.updateJob),
  authentication(),
  updateJob
);

router.delete(
  "/:jobId",
  validation(validators.deleteJob),
  authentication(),
  deleteJob
);

router.get("/", validation(validators.filterJobs), filterJobs);

router.get("/:jobId?", validation(validators.getCompanyJobs), getCompanyJobs);

router.get(
  "/:jobId/applications",
  validation(validators.getApplicationsForJob),
  authentication(),
  getApplicationsForJob
);

router.post(
  "/:jobId/apply",
  validation(validators.applyToJob),
  authentication(),
  uploadCloudFile(fileValidations.document).single("userCV"),
  applyToJob
);

router.patch(
  "/:jobId/applications/:applicationId/status",
  validation(validators.updateApplicationStatus),
  authentication(),
  updateApplicationStatus
);

export default router;
