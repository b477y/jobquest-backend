import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import { authentication } from "../../../middlewares/graph/authentication.middleware.js";
import { UserRole } from "../../../utils/enum/enum.js";
import { validation } from "../../../middlewares/graph/validation.middleware.js";
import { getAllUsersGraph } from "../user.validation.js";

export const getAllUsers = async (parent, args) => {
  const { authorization } = args;

  await validation(getAllUsersGraph, args);

  await authentication({ authorization, accessRoles: [UserRole.ADMIN] });

  const users = await dbService.find({
    model: UserModel,
    filter: {
      deletedAt: { $exists: false },
    },
  });

  return {
    message: "Users retrieved successfully",
    statusCode: 200,
    data: users,
  };
};
