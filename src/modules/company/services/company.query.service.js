import CompanyModel from "../../../db/models/company.model.js";
import * as dbService from "../../../db/db.service.js";

export const getAllCompanies = async () => {
  const companies = await dbService.find({
    model: CompanyModel,
  });

  return {
    message: "Companies retrieved successfully",
    statusCode: 200,
    data: companies,
  };
};
