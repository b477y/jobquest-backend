import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const addCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyName, companyEmail, description, industry } = req.body;

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      companyName,
      companyEmail,
      deletedAt: { $exists: false },
    },
  });

  if (company) {
    return next(new Error("Company already exists", { cause: 409 }));
  }

  await dbService.create({
    model: CompanyModel,
    data: {
      ...req.body,
      createdBy: userId,
    },
  });

  return successResponse({
    res,
    status: 201,
    message: "Company added successfully",
  });
});

export default addCompany;
