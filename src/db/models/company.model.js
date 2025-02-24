import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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
      required: true,
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

const CompanyModel =
  mongoose.models.Company || mongoose.model("Company", companySchema);
export default CompanyModel;
