import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import CompanyModel from "../../../db/models/company.model.js";

const updateCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const company = await dbService.findOneAndUpdate({
    model: CompanyModel,
    id: companyId,
    filter: {
      deletedAt: { $exists: false },
      createdBy: userId,
    },
    data: { ...req.body },
  });

  return successResponse({
    res,
    status: 200,
    message: "Company data updated successfully",
    data: { company },
  });
});

export default updateCompany;
