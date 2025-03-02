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

const router = Router({ mergeParams: true });

router.post("/", authentication(), addJob);

router.patch("/:jobId", authentication(), updateJob);

router.delete("/:jobId", authentication(), deleteJob);

router.get("/", filterJobs);

router.get("/:jobId?", getCompanyJobs);

router.get("/:jobId/applications", authentication(), getApplicationsForJob);

router.post(
  "/:jobId/apply",
  authentication(),
  uploadCloudFile(fileValidations.document).single("userCV"),
  applyToJob
);

router.patch(
  "/:jobId/applications/:applicationId/status",
  authentication(),
  updateApplicationStatus
);

export default router;
