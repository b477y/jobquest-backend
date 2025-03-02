import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const addCompany = joi
  .object()
  .keys({
    companyName: generalFields.companyName.required(),
    companyEmail: generalFields.email.required(),
    legalAttachment: generalFields.legalAttachment.required(),
    description: generalFields.description,
    industry: generalFields.industry,
    address: generalFields.address,
    logo: generalFields.image,
    coverPic: generalFields.image,
    HRs: generalFields.id,
    numberOfEmployees: generalFields.numberOfEmployees,
  })
  .required();

export const updateCompany = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    companyName: generalFields.companyName,
    companyEmail: generalFields.email,
    description: generalFields.description,
    industry: generalFields.industry,
    address: generalFields.address,
    logo: generalFields.image,
    coverPic: generalFields.image,
    HRs: generalFields.id,
    numberOfEmployees: generalFields.numberOfEmployees,
  })
  .required();

export const attachHrToCompany = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    hrId: generalFields.id.required(),
  })
  .required();

export const softDeleteCompany = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
  })
  .required();

export const getCompanyWithJobs = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
  })
  .required();

export const searchCompanyByName = joi
  .object()
  .keys({
    name: generalFields.companyName.required(),
  })
  .required();

export const uploadCompanyLogo = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    companyLogo: generalFields.image.required(),
  })
  .required();

export const uploadCompanyCover = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    companyCover: generalFields.image.required(),
  })
  .required();

export const deleteCompanyLogo = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
  })
  .required();

export const deleteCompanyCover = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
  })
  .required();

export const companyBan = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    action: generalFields.action.required(),
  })
  .required();

export const companyApprove = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
  })
  .required();

export const getAllCompanies = joi
  .object()
  .keys({
    authorization: generalFields.authorization.required(),
  })
  .required();

export const getAllCompaniesGraph = joi
  .object()
  .keys({
    authorization: joi.string(),
  })
  .required();
