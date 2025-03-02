import asyncHandler from "../../../utils/response/error.response.js";
import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import { OtpTypes } from "../../../utils/enum/enum.js";
import { compareHash } from "../../../utils/security/hash.security.js";

const confirmEmail = asyncHandler(async (req, res, next) => {
  const { email, OTP } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, deletedAt: { $exists: false } },
  });
  
  if (!user || !user.OTP.length) {
    return next(new Error("Invalid OTP or user not found", 400));
  }

  const storedOtp = user.OTP.find((otp) => otp.type === OtpTypes.CONFIRM_EMAIL);

  if (!storedOtp) {
    return next(new Error("No OTP found", 400));
  }

  if (new Date(storedOtp.expiresIn) < new Date()) {
    return next(new Error("OTP has expired", 400));
  }

  const isMatch = await compareHash({
    plaintext: OTP,
    encryptedText: storedOtp.code,
  });

  if (!isMatch) {
    return next(new Error("Invalid OTP", 400));
  }

  user.isConfirmed = true;
  user.OTP = user.OTP.filter((otp) => otp.type !== OtpTypes.CONFIRM_EMAIL);
  await user.save();

  return successResponse({
    res,
    status: 200,
    message: "Email successfully confirmed",
  });
});

export default confirmEmail;
