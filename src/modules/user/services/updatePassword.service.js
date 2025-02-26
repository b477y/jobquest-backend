import asyncHandler from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import UserModel from "../../../db/models/user.model.js";
import successResponse from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.security.js";

const updatePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { oldPassword, password, confirmationPassword } = req.body;

  if (!oldPassword || !password || !confirmationPassword) {
    return next(new Error("All inputs are required", { cause: 401 }));
  }

  const user = await dbService.findById({ model: UserModel, id: userId });

  if (!compareHash({ plaintext: oldPassword, encryptedText: user.password })) {
    return next(new Error("The old Password is not correct", { cause: 409 }));
  }

  if (oldPassword === password) {
    return next(
      new Error(
        "The new password can not be the same of old password, Please enter another new password",
        {
          cause: 401,
        }
      )
    );
  }

  if (password !== confirmationPassword) {
    return next(
      new Error("New password & confirmation password not matched", {
        cause: 401,
      })
    );
  }

  await dbService.findByIdAndUpdate({
    model: UserModel,
    id: userId,
    data: {
      password,
      changeCredentialsTime: Date.now(),
    },
  });

  return successResponse({
    res,
    status: 200,
    message: "Password updated successfully",
  });
});

export default updatePassword;
