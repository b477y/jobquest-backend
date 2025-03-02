import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const addJob = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    jobTitle: generalFields.jobTitle.required(),
    jobLocation: generalFields.jobLocation.required(),
    workingTime: generalFields.workingTime.required(),
    seniorityLevel: generalFields.seniorityLevel.required(),
    jobDescription: generalFields.jobDescription.required(),
    technicalSkills: generalFields.technicalSkills.required(),
    softSkills: generalFields.softSkills.required(),
  })
  .required();

export const updateJob = joi
  .object()
  .keys({
    jobId: generalFields.id.required(),
    companyId: generalFields.id.required(),
    jobTitle: generalFields.jobTitle.required(),
    jobLocation: generalFields.jobLocation.required(),
    workingTime: generalFields.workingTime.required(),
    seniorityLevel: generalFields.seniorityLevel.required(),
    jobDescription: generalFields.jobDescription.required(),
    technicalSkills: generalFields.technicalSkills.required(),
    softSkills: generalFields.softSkills.required(),
  })
  .required();

export const deleteJob = joi
  .object()
  .keys({
    jobId: generalFields.id.required(),
  })
  .required();

export const filterJobs = joi
  .object()
  .keys({
    jobTitle: generalFields.jobTitle,
    jobLocation: generalFields.jobLocation,
    workingTime: generalFields.workingTime,
    seniorityLevel: generalFields.seniorityLevel,
    technicalSkills: generalFields.technicalSkills,
    page: generalFields.page,
    limit: generalFields.limit,
    sort: generalFields.sort,
    order: generalFields.order,
  })
  .required();

export const getCompanyJobs = joi
  .object()
  .keys({
    companyId: generalFields.id.required(),
    jobId: generalFields.id.required(),
    name: generalFields.jobTitle,
    page: generalFields.page,
    limit: generalFields.limit,
    sort: generalFields.sort,
    order: generalFields.order,
  })
  .required();

export const getApplicationsForJob = joi
  .object()
  .keys({
    jobId: generalFields.id.required(),
    page: generalFields.page,
    limit: generalFields.limit,
    sort: generalFields.sort,
    order: generalFields.order,
  })
  .required();

export const applyToJob = joi
  .object()
  .keys({
    jobId: generalFields.id.required(),
    userCV: generalFields.userCV,
  })
  .required();

export const updateApplicationStatus = joi
  .object()
  .keys({
    applicationId: generalFields.id.required(),
  })
  .required();
