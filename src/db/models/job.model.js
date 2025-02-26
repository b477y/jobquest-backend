import mongoose from "mongoose";
import {
  JobLocation,
  WorkingTime,
  SeniorityLevel,
} from "../../utils/enum/enum.js";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      enum: Object.values(JobLocation),
      required: true,
      set: (value) => value.toLowerCase(),
    },
    workingTime: {
      type: String,
      enum: Object.values(WorkingTime),
      required: true,
      set: (value) => value.toLowerCase(),
    },
    seniorityLevel: {
      type: String,
      enum: Object.values(SeniorityLevel),
      required: true,
      set: (value) => value.toLowerCase(),
    },
    jobDescription: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: [String],
      required: true,
      validate: {
        validator: (skills) => skills.length > 0,
        message: "At least one technical skill is required",
      },
    },
    softSkills: {
      type: [String],
      required: true,
      set: (skills) => skills.map((skill) => skill.toLowerCase()),
      validate: {
        validator: (skills) => Array.isArray(skills) && skills.length > 0,
        message: "At least one soft skill is required",
      },
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    closed: {
      type: Boolean,
      default: false,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default JobModel;
