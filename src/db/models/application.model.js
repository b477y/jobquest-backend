import mongoose from "mongoose";
import { ApplicationStatus } from "../../utils/enum/enum.js";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userCV: {
      secure_url: {
        type: String,
        required: true,
        validate: {
          validator: (url) => url.endsWith(".pdf"),
          message: "CV must be a PDF file",
        },
      },
      public_id: { type: String, required: true },
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
  },
  { timestamps: true }
);

applicationSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default ApplicationModel;
