import CompanyModel from "../../../db/models/company.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import * as dbService from "../../../db/db.service.js";

export const companyApprove = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;

  if (!companyId)
    return next(new Error("Company ID is required", { cause: 409 }));

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      _id: companyId,
      deletedAt: { $exists: false },
    },
  });

  if (!company) {
    return next(
      new Error("Company not found or has been deleted", { cause: 404 })
    );
  }

  if (company.approvedByAdmin) {
    return next(new Error("Company is already approved", { cause: 400 }));
  }

  await dbService.findOneAndUpdate({
    model: CompanyModel,
    filter: { _id: companyId },
    data: {
      approvedByAdmin: true,
    },
  });

  return successResponse({
    res,
    status: 200,
    message: "Company approved successfully",
  });
});

export default companyApprove;
