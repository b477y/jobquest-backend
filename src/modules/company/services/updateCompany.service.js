import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import CompanyModel from "../../../db/models/company.model.js";

const updateCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;
  const { legalAttachment, ...updateData } = req.body;

  if (legalAttachment !== undefined) {
    return next(
      new Error("You are not allowed to update legalAttachment", { cause: 403 })
    );
  }

  const company = await dbService.findOneAndUpdate({
    model: CompanyModel,
    id: companyId,
    filter: {
      deletedAt: { $exists: false },
      createdBy: userId,
    },
    data: { updateData },
  });

  if (!company) {
    return next(new Error("Company not found or unauthorized", { cause: 404 }));
  }

  return successResponse({
    res,
    status: 200,
    message: "Company data updated successfully",
    data: { company },
  });
});

export default updateCompany;
