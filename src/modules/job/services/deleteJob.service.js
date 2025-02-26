import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import JobModel from "../../../db/models/job.model.js";
import CompanyModel from "../../../db/models/company.model.js";

const deleteJob = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { jobId } = req.params;

  const job = await dbService.findOne({
    model: JobModel,
    filter: { _id: jobId, closed: false },
  });

  if (!job) {
    return next(new Error("Job not found or already closed", { cause: 404 }));
  }

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: { _id: job.companyId, HRs: { $in: [userId] } },
  });

  if (!company) {
    return next(
      new Error("Unauthorized: You are not an HR for this company", {
        cause: 403,
      })
    );
  }

  const updatedJob = await dbService.findOneAndUpdate({
    model: JobModel,
    id: jobId,
    data: { closed: true },
  });

  return successResponse({
    res,
    status: 200,
    message: "Job closed successfully",
    data: { updatedJob },
  });
});

export default deleteJob;
