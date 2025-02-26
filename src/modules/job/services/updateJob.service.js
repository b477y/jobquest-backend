import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import JobModel from "../../../db/models/job.model.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const updateJob = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId, jobId } = req.params;
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
  } = req.body;

  if (!companyId || !jobTitle || !jobId || !jobDescription) {
    return next(new Error("Missing required fields", { cause: 400 }));
  }

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      _id: companyId,
      deletedAt: { $exists: false },
    },
  });

  if (!company) {
    return next(new Error("Company not found", { cause: 404 }));
  }

  const job = await dbService.findOneAndUpdate({
    model: JobModel,
    filter: {
      _id: jobId,
      addedBy: userId,
      closed: false,
    },
    data: {
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      seniorityLevel,
      workingTime,
      technicalSkills,
      softSkills,
    },
  });

  if (!job) {
    return next(new Error("Job doesn't exist", { cause: 404 }));
  }

  return successResponse({
    res,
    status: 200,
    message: "Job updated successfully",
    data: job,
  });
});

export default updateJob;
