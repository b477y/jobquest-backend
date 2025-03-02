import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const signUp = joi
  .object({
    firstName: joi.string().min(2).max(30).required(),
    lastName: joi.string().min(2).max(30).required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    mobileNumber: generalFields.mobileNumber.required(),
    gender: generalFields.gender.required(),
    DOB: generalFields.DOB.required(),
  })
  .required();

export const confirmEmail = joi
  .object({
    email: generalFields.email.required(),
    OTP: generalFields.OTP.required(),
  })
  .required();

export const signIn = joi
  .object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  })
  .required();

export const authenticateWithGoogle = joi
  .object({
    idToken: generalFields.idToken.required(),
  })
  .required();

export const forgotPassword = joi
  .object({
    email: generalFields.email.required(),
  })
  .required();

export const resetPassword = joi
  .object()
  .keys({
    email: generalFields.email.required(),
    OTP: generalFields.OTP.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.required(),
  })
  .required();
