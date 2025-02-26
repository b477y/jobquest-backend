import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const deleteCompanyLogo = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const company = await dbService.findById({
    model: CompanyModel,
    id: companyId,
    filter: { deletedAt: { $exists: false }, createdBy: userId },
  });

  if (!company?.logo?.public_id) {
    return next(new Error("Company logo does not exist", { cause: 400 }));
  }

  await cloud.uploader.destroy(company.logo.public_id);

  company.logo = undefined;
  await company.save();

  return successResponse({
    res,
    status: 200,
    message: "Company logo deleted successfully",
  });
});

export default deleteCompanyLogo;
