import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import JobModel from "../../../db/models/job.model.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const addJob = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  if (!companyId || !jobTitle || !jobDescription) {
    return next(new Error("Missing required fields", { cause: 400 }));
  }

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      _id: companyId,
      deletedAt: { $exists: false },
    },
  });

  if (!company.approvedByAdmin) {
    return next(
      new Error("Adding company request are not approved from the admin yet", {
        cause: 400,
      })
    );
  }

  if (!company) {
    return next(new Error("Company not found", { cause: 404 }));
  }

  const isOwner = company.createdBy.toString() === userId.toString();

  const isHR = company.HRs.some(
    (hrId) => hrId.toString() === userId.toString()
  );

  if (!isOwner && !isHR) {
    return next(
      new Error("Unauthorized: Only the company owner or HRs can create jobs", {
        cause: 403,
      })
    );
  }

  const newJob = await dbService.create({
    model: JobModel,
    data: { ...req.body },
  });

  return successResponse({
    res,
    status: 201,
    message: "Job added successfully",
    data: newJob,
  });
});

export default addJob;
