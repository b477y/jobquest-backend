import ApplicationModel from "../../../db/models/application.model.js";
import JobModel from "../../../db/models/job.model.js";
import { ApplicationStatus } from "../../../utils/enum/enum.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import * as dbService from "../../../db/db.service.js";

export const applyToJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await dbService.findOne({
    model: JobModel,
    filter: {
      closed: false,
      _id: jobId,
    },
  });

  if (!jobExists) {
    return next(new Error("Job not found.", { cause: 404 }));
  }

  const existingApplication = await dbService.findOne({
    model: ApplicationModel,
    filter: {
      userId,
      jobId,
    },
  });

  if (existingApplication) {
    return next(
      new Error("You have already applied for this job.", { cause: 400 })
    );
  }

  if (!req.file) {
    return next(new Error("CV file is required.", { cause: 400 }));
  }

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/companies/${jobExists.companyId}/job_applications/${jobId}`,
    public_id: `${userId}_cv`,
    resource_type: "auto",
    format: "pdf",
  });

  const newApplication = await dbService.create({
    model: ApplicationModel,
    data: {
      jobId,
      userId,
      userCV: { secure_url, public_id },
      status: ApplicationStatus.PENDING,
    },
  });

  return successResponse({
    res,
    status: 201,
    message: "Application submitted successfully",
    data: newApplication,
  });
});
