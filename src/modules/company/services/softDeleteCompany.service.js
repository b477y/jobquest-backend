import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";

const softDeleteCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const company = await dbService.findOneAndUpdate({
    model: CompanyModel,
    filter: {
      _id: companyId,
      deletedAt: { $exists: false },
      createdBy: userId,
    },
    data: {
      deletedAt: Date.now(),
    },
  });

  if(!company){
    return next(new Error("Company doesn't exist", { cause: 404 }));
  }

  return successResponse({
    res,
    status: 200,
    message: "Company deleted successfully",
  });
});

export default softDeleteCompany;
