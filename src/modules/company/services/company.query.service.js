import CompanyModel from "../../../db/models/company.model.js";
import * as dbService from "../../../db/db.service.js";
import { authentication } from "../../../middlewares/graph/authentication.middleware.js";
import { UserRole } from "../../../utils/enum/enum.js";
import { validation } from "../../../middlewares/graph/validation.middleware.js";
import { getAllCompaniesGraph } from "../company.validation.js";

export const getAllCompanies = async (parent, args) => {
  const { authorization } = args;

  await validation(getAllCompaniesGraph, args);

  await authentication({ authorization, accessRoles: [UserRole.ADMIN] });

  const companies = await dbService.find({
    model: CompanyModel,
  });

  return {
    message: "Companies retrieved successfully",
    statusCode: 200,
    data: companies,
  };
};
