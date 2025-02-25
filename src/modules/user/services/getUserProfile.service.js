import * as dbService from "../../../db/db.service.js";
import userModel from "../../../db/models/user.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";

const getUserProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const user = await dbService.findOne({
    model: userModel,
    filter: {
      _id: userId,
      deletedAt: { $exists: false },
    },
    select: "firstName lastName username mobileNumber email gender",
  });

  return successResponse({
    res,
    status: 200,
    message: "Profile retrieved successfully",
    data: user,
  });
});
export default getUserProfile;
