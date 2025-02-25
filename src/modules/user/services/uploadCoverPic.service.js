import asyncHandler from "../../../utils/response/error.response.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import * as dbService from "../../../db/db.service.js";
import UserModel from "../../../db/models/user.model.js";
import successResponse from "../../../utils/response/success.response.js";

const uploadProfileCover = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/user/${userId}/profile`,
    public_id: `coverPic`,
  });

  const user = await dbService.findByIdAndUpdate({
    model: UserModel,
    id: userId,
    data: {
      coverPic: { secure_url, public_id },
    },
    options: { new: true },
  });

  return successResponse({
    res,
    status: 201,
    message: "Profile cover uploaded successfully",
    data: { profileCover: user.coverPic },
  });
});

export default uploadProfileCover;
