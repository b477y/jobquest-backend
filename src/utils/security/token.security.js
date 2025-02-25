import jwt from "jsonwebtoken";
import { TokenType, UserRole } from "../enum/enum.js";
import asyncHandler from "../response/error.response.js";

export const generateTokens = async ({
  payload,
  accessTokenSK = null, // optional
  refreshTokenSK,
  tokenType = [TokenType.ACCESS, TokenType.REFRESH],
}) => {
  if (!payload || !refreshTokenSK) {
    throw new Error("Payload and refresh token secret key are required.");
  }

  let tokens = {};

  if (tokenType.includes(TokenType.ACCESS) && accessTokenSK) {
    tokens.accessToken = jwt.sign(payload, accessTokenSK, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  }

  if (tokenType.includes(TokenType.REFRESH)) {
    tokens.refreshToken = jwt.sign(payload, refreshTokenSK, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  }

  return tokens;
};

export const verifyToken = ({ token, secretKey } = {}) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

export const decodeToken = asyncHandler(
  async ({ authorization, tokenType, next } = {}) => {
    if (typeof authorization !== "string") {
      return next(new Error("Invalid authorization format", { cause: 401 }));
    }

    const [bearer, token] = authorization.split(" ");

    if (!bearer || !token) {
      return next(new Error("Invalid authorization format", { cause: 401 }));
    }

    let accessTokenSK, refreshTokenSK;

    switch (bearer) {
      case UserRole.ADMIN:
        accessTokenSK = process.env.ADMIN_ACCESS_TOKEN_SK;
        refreshTokenSK = process.env.ADMIN_REFRESH_TOKEN_SK;
        break;

      case "Bearer":
        accessTokenSK = process.env.USER_ACCESS_TOKEN_SK;
        refreshTokenSK = process.env.USER_REFRESH_TOKEN_SK;
        break;

      default:
        break;
    }

    const decoded = verifyToken({
      token,
      secretKey:
        tokenType === TokenType.ACCESS ? accessTokenSK : refreshTokenSK,
    });

    if (!decoded?.userId) {
      return next(new Error("In-valid token payload", { cause: 401 }));
    }

    const user = await dbService.findOne({
      model: UserModel,
      filter: { _id: decoded.userId, deletedAt: { $exists: false } },
    });

    if (!user) {
      return next(new Error("Not registered account", { cause: 404 }));
    }

    if (user.changeCredentialsTime?.getTime() >= decoded.iat * 1000) {
      return next(new Error("In-valid credentials", { cause: 400 }));
    }

    return { user: { userId: user._id, role: user.role } };
  }
);
