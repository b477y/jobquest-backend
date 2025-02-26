import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const deleteCompanyCover = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const company = await dbService.findById({
    model: CompanyModel,
    id: companyId,
    filter: { deletedAt: { $exists: false }, createdBy: userId },
  });

  if (!company?.coverPic?.public_id) {
    return next(
      new Error("Company cover photo does not exist", { cause: 400 })
    );
  }

  await cloud.uploader.destroy(company.coverPic.public_id);

  company.coverPic = undefined;
  await company.save();

  return successResponse({
    res,
    status: 200,
    message: "Company cover photo deleted successfully",
  });
});

export default deleteCompanyCover;
