import asyncHandler from "../../../utils/response/error.response.js";
import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import successResponse from "../../../utils/response/success.response.js";

const signUp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, deletedAt: { $exists: false } },
  });

  if (user) {
    return next(new Error("Email already exists", { cause: 409 }));
  }

  const newUser = await dbService.create({
    model: UserModel,
    data: { ...req.body },
  });

  emailEvent.emit("sendConfirmEmail", { id: newUser._id, email });

  return successResponse({
    res,
    status: 201,
    message:
      "User added successfully. Please check your email to verify your account.",
    data: newUser,
  });
});

export default signUp;
