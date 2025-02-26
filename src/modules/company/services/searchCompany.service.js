import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const searchCompanyByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(new Error("Company name is required", { cause: 400 }));
  }

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      companyName: { $regex: name, $options: "i" },
      deletedAt: { $exists: false },
    },
  });

  return successResponse({
    res,
    status: 200,
    message: "Company data retrieved successfully",
    data: company,
  });
});

export default searchCompanyByName;
