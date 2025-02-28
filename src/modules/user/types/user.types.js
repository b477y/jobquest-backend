import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { imageType } from "../../../utils/app.types.shared.js";

export const oneUserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    address: { type: GraphQLString },
    DOB: { type: GraphQLString },
    image: { type: imageType },
    gender: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const getProfileResponse = new GraphQLObjectType({
  name: "getProfileResponse",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: { type: oneUserType },
  },
});

export const allUsersResponse = new GraphQLObjectType({
  name: "allUsersResponse",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: { type: new GraphQLList(oneUserType) },
  },
});