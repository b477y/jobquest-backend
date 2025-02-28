import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as companyGraphController from "./company/company.graph.controller.js";
import * as userGraphController from "./user/user.graph.controller.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "JobQuestQuery",
    description: "Main application query",
    fields: {
      ...userGraphController.query,
      ...companyGraphController.query,
    },
  }),
});
