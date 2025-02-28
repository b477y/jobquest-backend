import CompanyModel from "../../../db/models/company.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import * as dbService from "../../../db/db.service.js";
import { BanActions } from "../../../utils/enum/enum.js";

const companyBan = asyncHandler(async (req, res, next) => {
  const { action } = req.query;
  const { companyId } = req.params;

  if (!companyId)
    return next(new Error("Company ID is required", { cause: 409 }));

  if (!action) {
    return next(
      new Error("The action query parameter is required", { cause: 400 })
    );
  }

  const normalizedAction = action.toLowerCase();

  if (![BanActions.BAN, BanActions.UNBAN].includes(normalizedAction)) {
    return next(
      new Error(
        `Invalid action. Allowed values: ['${BanActions.BAN}', '${BanActions.UNBAN}']`,
        {
          cause: 400,
        }
      )
    );
  }

  const company = await dbService.findOne({
    model: CompanyModel,
    filter: {
      _id: companyId,
      deletedAt: { $exists: false },
    },
  });

  if (!company) {
    return next(
      new Error("Company not found or has been deleted", { cause: 404 })
    );
  }

  if (normalizedAction === BanActions.BAN && company.bannedAt) {
    return next(new Error("The company is already banned", { cause: 400 }));
  }

  if (normalizedAction === BanActions.UNBAN && !company.bannedAt) {
    return next(new Error("The company is not banned", { cause: 400 }));
  }

  await dbService.findOneAndUpdate({
    model: CompanyModel,
    filter: { _id: companyId },
    data:
      normalizedAction === BanActions.BAN
        ? { bannedAt: Date.now() }
        : { $unset: { bannedAt: "" } },
  });

  return successResponse({
    res,
    status: 200,
    message:
      normalizedAction === BanActions.BAN
        ? "Company banned successfully"
        : "Company unbanned successfully",
  });
});

export default companyBan;
