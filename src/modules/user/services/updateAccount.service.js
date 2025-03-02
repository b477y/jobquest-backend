import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import UserModel from "../../../db/models/user.model.js";
import successResponse from "../../../utils/response/success.response.js";

const updateAccount = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  await dbService.findByIdAndUpdate({
    model: UserModel,
    id: userId,
    data: { ...req.body },
  });

  return successResponse({
    res,
    status: 200,
    message: "Profile updated successfully",
  });
});

export default updateAccount;
