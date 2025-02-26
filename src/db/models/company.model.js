import mongoose from "mongoose";
import JobModel from "./job.model.js";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
    },
    address: {
      type: String,
    },
    numberOfEmployees: {
      type: String,
      enum: [
        "1-10",
        "11-20",
        "21-50",
        "51-100",
        "101-200",
        "201-500",
        "501-1000",
        "1001+",
      ],
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    logo: { secure_url: String, public_id: String },
    coverPic: { secure_url: String, public_id: String },
    HRs: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    bannedAt: Date,
    deletedAt: Date,
    legalAttachment: { secure_url: String, public_id: String },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

companySchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "companyId",
});

const CompanyModel =
  mongoose.models.Company || mongoose.model("Company", companySchema);
export default CompanyModel;
