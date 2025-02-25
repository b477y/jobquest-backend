import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import UserModel from "../../../db/models/user.model.js";
import successResponse from "../../../utils/response/success.response.js";

const deleteProfilePic = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const user = await dbService.findById({ model: UserModel, id: userId });

  if (!user.profilePic?.public_id) {
    return next(new Error("Profile picture does not exist", { cause: 400 }));
  }

  await cloud.uploader.destroy(user.profilePic.public_id);

  user.profilePic = undefined;
  await user.save();

  return successResponse({
    res,
    status: 200,
    message: "Profile picture deleted successfully",
  });
});

export default deleteProfilePic;
