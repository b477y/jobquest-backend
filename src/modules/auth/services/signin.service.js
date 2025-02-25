import asyncHandler from "../../../utils/response/error.response.js";
import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import { TokenType, UserRole } from "../../../utils/enum/enum.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { generateTokens } from "../../../utils/security/token.security.js";

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email, deletedAt: { $exists: false } },
  });

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  const isMatch = await compareHash({
    plaintext: password,
    encryptedText: user.password,
  });

  if (!isMatch) {
    return next(new Error("Invalid credentials", { cause: 400 }));
  }

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
      return next(new Error(`Invalid user role: ${user.role}`));
  }

  const tokens = await generateTokens({
    payload: { userId: user._id },
    accessTokenSK,
    refreshTokenSK,
    tokenType: [TokenType.ACCESS, TokenType.REFRESH],
  });

  return successResponse({
    res,
    status: 200,
    message: "Logged in successfully",
    data: { tokens },
  });
});

export default signIn;
