import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const publicProfile = joi
  .object()
  .keys({
    profileId: generalFields.id.required(),
  })
  .required();

export const userBan = joi
  .object()
  .keys({
    userId: generalFields.id.required(),
    action: generalFields.action.required(),
  })
  .required();

export const updateAccount = joi
  .object()
  .keys({
    firstName: generalFields.firstName,
    lastName: generalFields.lastName,
    mobileNumber: generalFields.mobileNumber,
    gender: generalFields.gender,
    DOB: generalFields.DOB,
  })
  .required();

export const resetEmail = joi
  .object()
  .keys({
    confirmEmailOTP: generalFields.OTP.required(),
    temporaryEmailOTP: generalFields.OTP.required(),
    email: generalFields.email.required(),
  })
  .required();

export const updatePassword = joi
  .object()
  .keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.invalid(joi.ref("oldPassword")).required(),
    confirmationPassword: generalFields.confirmationPassword.required(),
  })
  .required();

export const getAllUsersGraph = joi
  .object()
  .keys({
    authorization: joi.string(),
  })
  .required();
