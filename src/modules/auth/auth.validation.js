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
