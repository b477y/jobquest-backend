import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { imageType } from "../../../utils/app.types.shared.js";

export const oneCompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    _id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    description: { type: GraphQLString },
    industry: { type: GraphQLString },
    address: { type: GraphQLString },
    numberOfEmployees: { type: GraphQLString },
    companyEmail: { type: GraphQLString },
    createdBy: { type: GraphQLID },
    logo: { type: imageType },
    coverPic: { type: imageType },
    approvedByAdmin: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const allCompaniesResponse = new GraphQLObjectType({
  name: "allCompaniesResponse",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: { type: new GraphQLList(oneCompanyType) },
  },
});
