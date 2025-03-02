import { GraphQLNonNull, GraphQLString } from "graphql";
import { getAllCompanies } from "./services/company.query.service.js";
import { allCompaniesResponse } from "./types/company.types.js";

export const query = {
  getAllCompanies: {
    type: allCompaniesResponse,
    args: {
      authorization: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getAllCompanies,
  },
};
