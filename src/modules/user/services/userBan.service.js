import UserModel from "../../../db/models/user.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import * as dbService from "../../../db/db.service.js";
import { BanActions } from "../../../utils/enum/enum.js";

const userBan = asyncHandler(async (req, res, next) => {
  const { action } = req.query;
  const { userId } = req.params;

  if (!userId) return next(new Error("User ID is required", { cause: 409 }));

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

  const user = await dbService.findOne({
    model: UserModel,
    filter: {
      _id: userId,
      deletedAt: { $exists: false },
    },
  });

  if (!user) {
    return next(
      new Error("User not found or has been deleted", { cause: 404 })
    );
  }

  if (normalizedAction === BanActions.BAN && user.bannedAt) {
    return next(new Error("The user is already banned", { cause: 400 }));
  }

  if (normalizedAction === BanActions.UNBAN && !user.bannedAt) {
    return next(new Error("The user is not banned", { cause: 400 }));
  }

  await dbService.findOneAndUpdate({
    model: UserModel,
    filter: { _id: userId },
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
        ? "User banned successfully"
        : "User unbanned successfully",
  });
});

export default userBan;
