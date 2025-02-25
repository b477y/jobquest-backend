import asyncHandler from "../../../utils/response/error.response.js";
import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import { emailEvent } from "../../../utils/events/email.event.js";

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, deletedAt: { $exists: false } },
  });

  if (!user) {
    return next(new Error("User not found", 400));
  }

  emailEvent.emit("forgotPassword", { id: user._id, email });

  return successResponse({
    res,
    status: 200,
    message: "Please check your email to reset your password",
  });
});

export default forgotPassword;
