import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import CompanyModel from "../../../db/models/company.model.js";

const attachHrToCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;
  const { hrId } = req.body;

  const company = await dbService.findOneAndUpdate({
    model: CompanyModel,
    id: companyId,
    filter: {
      deletedAt: { $exists: false },
      createdBy: userId,
      HRs: { $nin: [hrId] },
    },
    data: { $addToSet: { HRs: hrId } },
  });

  if (!company) {
    return next(
      new Error("This HR is already attached to your company", { cause: 401 })
    );
  }

  return successResponse({
    res,
    status: 200,
    message: "HR attached to your company successfully",
    data: { company },
  });
});

export default attachHrToCompany;
