import { getAllCompanies } from "./services/company.query.service.js";
import { allCompaniesResponse } from "./types/company.types.js";

export const query = {
  getAllCompanies: {
    type: allCompaniesResponse,
    resolve: getAllCompanies,
  },
};