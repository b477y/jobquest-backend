import jwt from "jsonwebtoken";
import { TokenType, UserRole } from "../enum/enum.js";

export const generateToken = ({ payload, secretKey, expiresIn } = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

export const verifyToken = ({ token, secretKey } = {}) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

export const decodeToken = async ({ authorization, tokenType, next } = {}) => {
  if (typeof authorization !== "string") {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  const [bearer, token] = authorization.split(" ");

  if (!bearer || !token) {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  let access_signature = "";
  let refresh_signature = "";

  switch (bearer) {
    case UserRole.ADMIN:
      access_signature = process.env.ADMIN_ACCESS_TOKEN_SK;
      refresh_signature = process.env.ADMIN_REFRESH_TOKEN_SK;
      break;

    case "Bearer":
      access_signature = process.env.USER_ACCESS_TOKEN_SK;
      refresh_signature = process.env.USER_REFRESH_TOKEN_SK;
      break;

    default:
      break;
  }

  const decoded = verifyToken({
    token,
    secretKey:
      tokenType === TokenType.ACCESS ? access_signature : refresh_signature,
  });

  if (!decoded?.id) {
    return next(new Error("In-valid token payload", { cause: 401 }));
  }

  const user = await dbService.findOne({
    model: UserModel,
    filter: { _id: decoded.id, deletedAt: { $exists: false } },
  });

  if (!user) {
    return next(new Error("Not registered account", { cause: 404 }));
  }

  if (user.changeCredentialsTime?.getTime() >= decoded.iat * 1000) {
    return next(new Error("In-valid credentials", { cause: 400 }));
  }

  return { user: { id: user._id, role: user.role } };
};
