import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import CompanyModel from "../../../db/models/company.model.js";
import successResponse from "../../../utils/response/success.response.js";

const addCompany = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const companyData = req.body;

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

  if (!req.file) {
    return next(
      new Error("Legal attachment file is required.", { cause: 400 })
    );
  }

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/companies/legal_documents`,
    public_id: `legal_attachment_${companyEmail}`,
    format: "pdf",
  });

  await dbService.create({
    model: CompanyModel,
    data: {
      ...companyData,
      legalAttachment: { secure_url, public_id },
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
