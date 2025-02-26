import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import CompanyModel from "../../../db/models/company.model.js";

const uploadCompanyLogo = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/companies/${companyId}/logo`,
    public_id: `companyLogo`,
  });

  const company = await dbService.findByIdAndUpdate({
    model: CompanyModel,
    id: companyId,
    filter: {
      deletedAt: { $exists: false },
      createdBy: userId,
    },
    data: {
      logo: { secure_url, public_id },
    },
  });

  return successResponse({
    res,
    status: 201,
    message: "Company logo uploaded successfully",
    data: { companyLogo: company.logo },
  });
});

export default uploadCompanyLogo;
