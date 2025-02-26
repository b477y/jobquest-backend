import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const getCompanyWithJobs = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;

  const company = await dbService.findById({
    model: CompanyModel,
    id: companyId,
    filter: { deletedAt: { $exists: false } },
    populate: ["jobs"],
  });

  if (!company) {
    return next(new Error("Company not found", { cause: 404 }));
  }

  return successResponse({
    res,
    status: 200,
    message: "Company with related jobs retrieved successfully",
    data: company,
  });
});

export default getCompanyWithJobs;
