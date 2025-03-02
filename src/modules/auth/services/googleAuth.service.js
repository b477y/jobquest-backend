import asyncHandler from "../../../utils/response/error.response.js";
import UserModel from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import successResponse from "../../../utils/response/success.response.js";
import { OAuth2Client } from "google-auth-library";
import { AuthProviders, TokenType } from "../../../utils/enum/enum.js";
import { generateTokens } from "../../../utils/security/token.security.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogle = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return next(new Error("Google ID Token is required", { cause: 400 }));
  }

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (error) {
    return next(new Error("Invalid Google token", { cause: 401 }));
  }

  const payload = ticket.getPayload();

  if (!payload.email_verified) {
    return next(new Error("In-valid account", { cause: 400 }));
  }

  const { email, given_name: firstName, family_name: lastName } = payload;

  const user = await dbService.findOne({
    model: UserModel,
    filter: {
      email,
      deletedAt: { $exists: false },
      provider: AuthProviders.GOOGLE,
    },
  });

  if (!user) {
    const newUser = await dbService.create({
      model: UserModel,
      data: {
        firstName,
        lastName,
        email,
        provider: AuthProviders.GOOGLE,
        isConfirmed: true,
      },
    });
    return successResponse({
      res,
      status: 201,
      message: "User signed up successfully with Google",
      data: { user: newUser },
    });
  }

  const tokens = await generateTokens({
    payload: { userId: user._id },
    accessTokenSK: process.env.USER_ACCESS_TOKEN_SK,
    refreshTokenSK: process.env.USER_REFRESH_TOKEN_SK,
    tokenType: [TokenType.ACCESS, TokenType.REFRESH],
  });

  return successResponse({
    res,
    status: 200,
    message: "User signed in successfully with Google",
    data: { tokens },
  });
});

export default authenticateWithGoogle;
