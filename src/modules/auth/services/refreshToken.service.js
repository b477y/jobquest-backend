import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import {
  generateTokens,
  decodeToken,
} from "../../../utils/security/token.security.js";
import { TokenType, UserRole } from "../../../utils/enum/enum.js";

const refreshToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new Error("Authorization header is required", { cause: 401 }));
  }

  const user = await decodeToken({
    authorization,
    tokenType: TokenType.REFRESH,
  });

  let accessTokenSK, refreshTokenSK;

  switch (user.role) {
    case UserRole.ADMIN:
      accessTokenSK = process.env.ADMIN_ACCESS_TOKEN_SK;
      refreshTokenSK = process.env.ADMIN_REFRESH_TOKEN_SK;
      break;
    case UserRole.USER:
      accessTokenSK = process.env.USER_ACCESS_TOKEN_SK;
      refreshTokenSK = process.env.USER_REFRESH_TOKEN_SK;
      break;
    default:
      throw new Error(`Invalid user role: ${user.role}`);
  }

  const tokens = await generateTokens({
    payload: { userId: user.userId },
    accessTokenSK,
    refreshTokenSK,
    tokenType: [TokenType.ACCESS, TokenType.REFRESH],
  });

  return successResponse({
    res,
    status: 200,
    message: "Tokens refreshed successfully",
    data: { tokens },
  });
});

export default refreshToken;
