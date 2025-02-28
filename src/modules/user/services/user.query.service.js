import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";

export const getAllUsers = async () => {
  const users = await dbService.find({
    model: UserModel,
  });

  return {
    message: "Users retrieved successfully",
    statusCode: 200,
    data: users,
  };
};
