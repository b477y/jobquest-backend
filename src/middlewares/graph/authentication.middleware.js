import * as dbService from "../../db/db.service.js";
import UserModel from "../../db/models/user.model.js";
import { verifyToken } from "../../utils/security/token.security.js";

export const authentication = async ({
  authorization = "",
  accessRoles = [],
  checkAuthorization = true,
} = {}) => {
  if (typeof authorization !== "string") {
    throw new Error("Invalid authorization format", { cause: 401 });
  }

  const [bearer, token] = authorization.split(" ");

  if (!bearer || !token) {
    throw new Error("Invalid authorization format", { cause: 401 });
  }

  let accessTokenSK;

  switch (bearer) {
    case "Admin":
      accessTokenSK = process.env.ADMIN_ACCESS_TOKEN_SK;
      break;
    case "Bearer":
      accessTokenSK = process.env.USER_ACCESS_TOKEN_SK;
      break;
    default:
      throw new Error("Invalid token type", { cause: 401 });
  }

  const decoded = verifyToken({
    token,
    secretKey: accessTokenSK,
  });

  if (!decoded?.userId) {
    throw new Error("In-valid token payload", { cause: 401 });
  }

  const user = await dbService.findOne({
    model: UserModel,
    filter: { _id: decoded.userId, deletedAt: { $exists: false } },
  });

  if (!user) {
    throw new Error("Not registered account", { cause: 404 });
  }

  if (user.changeCredentialsTime?.getTime() >= decoded.iat * 1000) {
    throw new Error("In-valid login credentials", { cause: 400 });
  }

  if (checkAuthorization && !accessRoles.includes(user.role)) {
    throw new Error("Unauthorized user", { cause: 403 });
  }
  return user;
};
