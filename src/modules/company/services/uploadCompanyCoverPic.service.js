import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import CompanyModel from "../../../db/models/company.model.js";

const uploadCompanyCover = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { companyId } = req.params;

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/companies/${companyId}/cover`,
    public_id: `companyCover`,
  });

  const company = await dbService.findByIdAndUpdate({
    model: CompanyModel,
    id: companyId,
    filter: {
      deletedAt: { $exists: false },
      createdBy: userId,
    },
    data: {
      coverPic: { secure_url, public_id },
    },
  });

  return successResponse({
    res,
    status: 201,
    message: "Company cover uploaded successfully",
    data: { companyCover: company.coverPic },
  });
});

export default uploadCompanyCover;