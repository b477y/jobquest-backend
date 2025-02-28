import { getAllUsers } from "./services/user.query.service.js";
import { allUsersResponse } from "./types/user.types.js";

export const query = {
  getAllUsers: {
    type: allUsersResponse,
    resolve: getAllUsers,
  },
};
