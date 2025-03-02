import joi from "joi";
import { Types } from "mongoose";
import {
  ApplicationStatus,
  AuthProviders,
  BanActions,
  Genders,
  JobLocation,
  SeniorityLevel,
  UserRole,
  WorkingTime,
} from "../utils/enum/enum.js";

export const isValidObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid object Id");
};

export const generalFields = {
  firstName: joi.string().min(2).max(50).trim(),
  lastName: joi.string().min(2).max(50).trim(),
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 3,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi
    .string()
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
  confirmationPassword: joi.string().valid(joi.ref("password")),
  DOB: joi.date().less("now"),
  gender: joi
    .string()
    .valid(...Object.values(Genders))
    .insensitive(true),
  provider: joi
    .string()
    .valid(...Object.values(AuthProviders))
    .insensitive(true),
  mobileNumber: joi
    .string()
    .pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
  address: joi.string(),
  OTP: joi.string().pattern(new RegExp(/^\d{4}$/)),
  id: joi.string().custom(isValidObjectId),
  content: joi.string().min(2).max(50000).trim(),
  role: joi.string().valid(...Object.values(UserRole)),
  image: joi.object({
    secure_url: joi.string().uri().required(),
    public_id: joi.string().required(),
  }),
  legalAttachment: joi.object({
    secure_url: joi.string().uri().required(),
    public_id: joi.string().required(),
  }),
  companyName: joi.string().min(2).max(50).trim(),
  description: joi.string().min(20).max(500).trim(),
  industry: joi.string().min(2).max(50).trim(),
  numberOfEmployees: joi
    .string()
    .valid(
      "1-10",
      "11-20",
      "21-50",
      "51-100",
      "101-200",
      "201-500",
      "501-1000",
      "1001+"
    ),
  action: joi.string().valid(BanActions.BAN, BanActions.UNBAN).insensitive(),
  authorization: joi.string(),
  jobTitle: joi.string().trim(),
  jobLocation: joi
    .string()
    .valid(...Object.values(JobLocation).map((loc) => loc.toLowerCase())),
  workingTime: joi
    .string()
    .valid(...Object.values(WorkingTime).map((time) => time.toLowerCase())),
  seniorityLevel: joi
    .string()
    .valid(
      ...Object.values(SeniorityLevel).map((level) => level.toLowerCase())
    ),
  jobDescription: joi.string().trim(),
  technicalSkills: joi.array().items(joi.string().trim()).min(1),
  softSkills: joi.array().items(joi.string().trim()).min(1),
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).default(10),
  sort: joi.string().valid("createdAt").default("createdAt"),
  order: joi.string().valid("asc", "desc").default("desc"),
  userCV: joi.object({
    secure_url: joi.string().uri().required(),
    public_id: joi.string().required(),
  }),
  idToken: joi.string(),
  status: joi
    .string()
    .valid(...Object.values(ApplicationStatus))
    .default(ApplicationStatus.PENDING),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.query, ...req.params };

    if (req.file || req.files?.length >= 0) {
      inputs.file = req.file || req.files;
    }

    const validationResult = schema.validate(inputs, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation error",
        details: validationResult.error.details,
      });
    }
    return next();
  };
};
