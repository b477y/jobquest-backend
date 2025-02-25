import * as dbService from "../../../db/db.service.js";
import userModel from "../../../db/models/user.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";

const softDelete = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  await dbService.updateOne({
    model: userModel,
    filter: {
      _id: userId,
      deletedAt: { $exists: false },
    },
    data: {
      deletedAt: Date.now(),
    },
  });

  return successResponse({
    res,
    status: 200,
    message: "Your account deleted successfully",
  });
});

export default softDelete;
